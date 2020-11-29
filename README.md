# another-xml-parser

## What is another-xml-parser

another-xml-parser is a very convenient Javascript package to parse xml.

## Installation

``` CMD
npm install another-xml-parser --save-dev
```

## Usage

``` Typescript
import parseXml from 'another-xml-parser'

const res = parseXml(
  `<?xml version="1.0" encoding="UTF-8" ?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
  xmlns:tem="http://tempurl.org/"
  xmlns:ent="http://schemas.datacontract.org/2004/07/ent.Entities"
  xmlns:arr="http://schemas.microsoft.com/2003/10/Serialization/Arrays">
  <soapenv:Header/>
  <soapenv:Body>
    <tem:GetData >
      <tem:sessionId>XXXXX</tem:sessionId>
      <tem:requestData>
        <ent:foo>foo</ent:foo>
        <ent:bar>bar&gt;</ent:bar>
        <ent:empty/>
        <ent:tata i:nil="true"/>
        <ent:bars>
          <arr:string>bar1</arr:string>
          <arr:string/>
        </ent:bars>
        <ent:numbers>
          <arr:number>1</arr:number>
          <arr:number>2</arr:number>
        </ent:numbers>
        <ent:booleans>
          <arr:boolean>true</arr:boolean>
          <arr:boolean>false</arr:boolean>
        </ent:booleans>
        <ent:cars>
          <ent:car>
            <ent:name>car1</ent:name>
            <ent:brand>Volkswagen</ent:brand>
          </ent:car>
          <ent:car>
            <ent:name>car2&lt;&gt;&amp;&quot;&apos;&lt;&gt;&amp;&quot;&apos;</ent:name>
            <ent:brand>BMW</ent:brand>
          </ent:car>
        </ent:cars>
      </tem:requestData>
    </tem:GetData>
  </soapenv:Body>
</soapenv:Envelope>
`, {
  escape: true
})

console.log(JSON.stringify(res))
```

Output:

``` JSON
{
  "tag": "soapenv:Envelope",
  "namespace": "soapenv",
  "name": "Envelope",
  "attrs": {
    "xmlns:soapenv": "http://schemas.xmlsoap.org/soap/envelope/",
    "xmlns:tem": "http://tempurl.org/",
    "xmlns:ent": "http://schemas.datacontract.org/2004/07/ent.Entities",
    "xmlns:arr": "http://schemas.microsoft.com/2003/10/Serialization/Arrays"
  },
  "selfCloseNode": false,
  "text": "",
  "children": [
    {
      "tag": "soapenv:Header",
      "namespace": "soapenv",
      "name": "Header",
      "attrs": {},
      "selfCloseNode": true,
      "text": "",
      "children": []
    },
    {
      "tag": "soapenv:Body",
      "namespace": "soapenv",
      "name": "Body",
      "attrs": {},
      "selfCloseNode": false,
      "text": "",
      "children": [
        {
          "tag": "tem:GetData",
          "namespace": "tem",
          "name": "GetData",
          "attrs": {},
          "selfCloseNode": false,
          "text": "",
          "children": [
            {
              "tag": "tem:sessionId",
              "namespace": "tem",
              "name": "sessionId",
              "attrs": {},
              "selfCloseNode": false,
              "text": "XXXXX",
              "children": []
            },
            {
              "tag": "tem:requestData",
              "namespace": "tem",
              "name": "requestData",
              "attrs": {},
              "selfCloseNode": false,
              "text": "",
              "children": [
                {
                  "tag": "ent:foo",
                  "namespace": "ent",
                  "name": "foo",
                  "attrs": {},
                  "selfCloseNode": false,
                  "text": "foo",
                  "children": []
                },
                {
                  "tag": "ent:bar",
                  "namespace": "ent",
                  "name": "bar",
                  "attrs": {},
                  "selfCloseNode": false,
                  "text": "bar>",
                  "children": []
                },
                {
                  "tag": "ent:empty",
                  "namespace": "ent",
                  "name": "empty",
                  "attrs": {},
                  "selfCloseNode": true,
                  "text": "",
                  "children": []
                },
                {
                  "tag": "ent:tata",
                  "namespace": "ent",
                  "name": "tata",
                  "attrs": {
                    "i:nil": "true"
                  },
                  "selfCloseNode": true,
                  "text": "",
                  "children": []
                },
                {
                  "tag": "ent:bars",
                  "namespace": "ent",
                  "name": "bars",
                  "attrs": {},
                  "selfCloseNode": false,
                  "text": "",
                  "children": [
                    {
                      "tag": "arr:string",
                      "namespace": "arr",
                      "name": "string",
                      "attrs": {},
                      "selfCloseNode": false,
                      "text": "bar1",
                      "children": []
                    },
                    {
                      "tag": "arr:string",
                      "namespace": "arr",
                      "name": "string",
                      "attrs": {},
                      "selfCloseNode": true,
                      "text": "",
                      "children": []
                    }
                  ]
                },
                {
                  "tag": "ent:numbers",
                  "namespace": "ent",
                  "name": "numbers",
                  "attrs": {},
                  "selfCloseNode": false,
                  "text": "",
                  "children": [
                    {
                      "tag": "arr:number",
                      "namespace": "arr",
                      "name": "number",
                      "attrs": {},
                      "selfCloseNode": false,
                      "text": "1",
                      "children": []
                    },
                    {
                      "tag": "arr:number",
                      "namespace": "arr",
                      "name": "number",
                      "attrs": {},
                      "selfCloseNode": false,
                      "text": "2",
                      "children": []
                    }
                  ]
                },
                {
                  "tag": "ent:booleans",
                  "namespace": "ent",
                  "name": "booleans",
                  "attrs": {},
                  "selfCloseNode": false,
                  "text": "",
                  "children": [
                    {
                      "tag": "arr:boolean",
                      "namespace": "arr",
                      "name": "boolean",
                      "attrs": {},
                      "selfCloseNode": false,
                      "text": "true",
                      "children": []
                    },
                    {
                      "tag": "arr:boolean",
                      "namespace": "arr",
                      "name": "boolean",
                      "attrs": {},
                      "selfCloseNode": false,
                      "text": "false",
                      "children": []
                    }
                  ]
                },
                {
                  "tag": "ent:cars",
                  "namespace": "ent",
                  "name": "cars",
                  "attrs": {},
                  "selfCloseNode": false,
                  "text": "",
                  "children": [
                    {
                      "tag": "ent:car",
                      "namespace": "ent",
                      "name": "car",
                      "attrs": {},
                      "selfCloseNode": false,
                      "text": "",
                      "children": [
                        {
                          "tag": "ent:name",
                          "namespace": "ent",
                          "name": "name",
                          "attrs": {},
                          "selfCloseNode": false,
                          "text": "car1",
                          "children": []
                        },
                        {
                          "tag": "ent:brand",
                          "namespace": "ent",
                          "name": "brand",
                          "attrs": {},
                          "selfCloseNode": false,
                          "text": "Volkswagen",
                          "children": []
                        }
                      ]
                    },
                    {
                      "tag": "ent:car",
                      "namespace": "ent",
                      "name": "car",
                      "attrs": {},
                      "selfCloseNode": false,
                      "text": "",
                      "children": [
                        {
                          "tag": "ent:name",
                          "namespace": "ent",
                          "name": "name",
                          "attrs": {},
                          "selfCloseNode": false,
                          "text": "car2<>&\"'<>&\"'",
                          "children": []
                        },
                        {
                          "tag": "ent:brand",
                          "namespace": "ent",
                          "name": "brand",
                          "attrs": {},
                          "selfCloseNode": false,
                          "text": "BMW",
                          "children": []
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```
