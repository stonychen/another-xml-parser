class XmlNode {
  public tag: string = ""
  public namespace: string = ""
  public name: string = ""
  public attrs: any = {}
  public selfCloseNode: boolean = false
  public text: string = ""
  public children: Array<XmlNode> = []
  public parent: XmlNode | undefined = undefined
}

class ElementNode {
  public tag: string = ""
  public namespace: string = ""
  public name: string = ""
  public attrs: any = {}
  public selfCloseNode: boolean = false
  public startNode: boolean = true
  public text: string = ""
}

function getFirstMatch(str: string, reg: RegExp) {
  const matches = str.match(reg)
  return matches && matches.length > 0 ? matches[0] : ""
}

function parseXml(xml: string, options: any): XmlNode | undefined {
  return parseToXmlNode(parseToElements(xml, options))
}

function parseToXmlNode(allNodes: Array<ElementNode>): XmlNode | undefined {
  const stack: Array<XmlNode> = []
  let root: XmlNode | undefined = undefined

  while (allNodes.length > 0) {
    const curr = allNodes.shift() as ElementNode
    const last = stack.length > 0 ? stack[stack.length - 1] : undefined
    const xmlNode = new XmlNode()

    if (curr.selfCloseNode) {
      xmlNode.name = curr.name
      xmlNode.attrs = curr.attrs
      xmlNode.namespace = curr.namespace
      xmlNode.tag = curr.tag
      xmlNode.selfCloseNode = curr.selfCloseNode
      xmlNode.text = curr.text

      if (last) {
        last.children.push(xmlNode)
      }

      root = xmlNode
    } else if (curr.startNode) {
      xmlNode.name = curr.name
      xmlNode.attrs = curr.attrs
      xmlNode.namespace = curr.namespace
      xmlNode.tag = curr.tag
      if (last) {
        last.children.push(xmlNode)
      }

      stack.push(xmlNode)
    } else {
      if (last) {
        last.text = curr.text
      }
      root = stack.pop()
    }
  }

  return root
}

function escape(val: string, esc: boolean = false) {
  if (esc)
    return val.replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, '\'')
  else
    return val
}

function parseToElements(xml: string, options: any): Array<ElementNode> {
  xml = xml.replace(/<\?[\S\s]+\?\>/ig, '')
  const matches = xml.match(/(<)[^<\>]+(>)/ig) || []
  let lastNode: ElementNode | undefined = undefined
  const allNodes: Array<ElementNode> = []

  while (matches.length > 0) {
    const currEle = matches.shift() as string
    const currNode: ElementNode = new ElementNode()

    currNode.tag = getFirstMatch(currEle, /(<|<\/)[^<\>\s]+(\s|>|\/\>)/)
      .replace(/<\/|\/\>|\>|<|\s/ig, "")
    currNode.selfCloseNode = /\/\>/.test(currEle)
    currNode.startNode = !/<\//.test(currEle)

    if (currNode.tag.indexOf(":") > -1) {
      currNode.name = currNode.tag.split(":")[1]
      currNode.namespace = currNode.tag.split(":")[0]
    } else {
      currNode.name = currNode.tag
    }


    if (!currNode.startNode && lastNode && lastNode.tag === currNode.tag) {
      // parse text
      const content = getFirstMatch(xml, /[^<\>]+(<\/[^<\>]+\>)/)
      currNode.text = escape(content.replace(/(<)[^<\>]+(>)/, "").trim(), options.escape)

      xml = xml.replace(content, '')
    } else {
      xml = xml.replace(currEle, "")
    }

    // parse attrs  
    if (currNode.startNode) {
      const attMatches = currEle.replace(/""/g, "&quo;")
        .match(/\s[\S^=]+="[^"]+"/g)
      attMatches?.map(m => {
        const arr = m.split("=")
        const attr = arr[0].trim()
        arr.shift()
        const val = arr.join("=")
          .replace(/"/g, "").replace(/&quo;/g, "\"")
        currNode.attrs[attr] = val
      })
    }


    lastNode = currNode
    allNodes.push(currNode)
  }

  return allNodes
}


export {
  XmlNode,
  parseXml
}
