declare class XmlNode {
    tag: string;
    namespace: string;
    name: string;
    attrs: any;
    selfCloseNode: boolean;
    text: string;
    children: Array<XmlNode>;
    parent: XmlNode | undefined;
}
declare function parseXml(xml: string, options: any): XmlNode | undefined;
export { XmlNode, parseXml };
