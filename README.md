# ServicesDocumentation

REST Services documentation template for use with any WiM services documentation.

## Development server

Clone or download zip file. Run `npm install`, then `ng serve` for a dev server. 
Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Configuration

The config.json located in the assets folder can be swapped out to change the sidebar Accordion Titles (resource[i].name) and contents (resource[i].methods.uriList[i].id). URL Routing is dynamically created based on these two properties. The Home page must be also custom configured for each REST Services Documenation application. 

## Configuration file structure
Properties (example) needed for config.json to work properly with application:
```
{
    "copyright": "2017 WiM - USGS",
    "author": "Tonia Roddick - USGS Wisconsin Internet Mapping", 
    "purpose": "External (to webpack bundling) config file for the web services documentation.",
    "notes": "for uriList[i].parameters[i] = Add 'optional: true' if parameter is optional. Add 'showMap: true' if .geojson is an availableMedia option",
    "configuration": {
        "services": "https://sigldev.wim.usgs.gov/SiGLServices",
        "mapper":"http://sigldev.wim.usgs.gov/sigl/",
        "application": "https://sigldev.wim.usgs.gov/SiGL_DMS",
        "homepagetitle": "SiGL Web Services",
        "resources": [
            {            
                "name": "Contacts",
                "description": "The CONTACT resources describes the contacts (usually principle investigators) associated with a PROJECT. It includes the contact name, email, phone, and organization. Each individual contact can only be associated with a single project, but projects can be associated with multiple contacts.",
                "methods": {
                    "type": "GET",
                    "uriList": [
                        {
                            "uri": "/contacts{0}",
                            "description": "This service returns a list of all contacts.",
                            "id": "All Contacts",
                            "parameters": [],
                            "availableMedia": [".xml", ".json"],
                            "selectedMedia": ".json"
                        },
                        {
                            "uri": "/contacts/{1}{0}",
                            "description": "This service returns a contact by it's ID.",
                            "id": "A Contact",
                            "parameters": [
                            { "name": "contactId", "type": "number", "description": "Id of the contact requested", "value": "" }
                            ],
                            "availableMedia": [".xml", ".json"],
                            "selectedMedia": ".json"
                        },
                        {
                            "uri": "/projects/{1}/contacts{0}",
                            "description": "This service returns a list of contacts that a project has.",
                            "id": "Project Contacts",
                            "parameters": [
                                { "name": "projectId", "type": "number", "description": "Id of the project requested", "value": "", "link": "../Project/AllProjects", "linkName": "See Projects" }
                            ],
                            "availableMedia": [".xml", ".json"],
                            "selectedMedia": ".json"
                        }
                    ]
                }
            },
            {
                "name": "Site",
                "description": "The SITE resource describes the basic information about a site. It includes: name, description, latitude, longitude, country, state, latitude, longitude, site description, waterbody, HUC8, sampling start date, sampling end date, sampling platform, site URL (if available), and additional information (open text field). Each individual site can only be associated with a single project, but projects can be associated with multiple sites.",
                "methods": {
                    "type": "GET",
                    "uriList": [
                        {
                            "uri": "/sites{0}",
                            "description": "This service returns a list of sites.",
                            "id": "All Sites",
                            "parameters": [],
                            "availableMedia": [".xml", ".json", ".geojson"],
                            "selectedMedia": ".json",
                            "showMap": true
                        },
                        {
                            "uri": "/sites/FilteredSites{0}?Duration={1}&Lake={2}&Media={3}&ProjObjs={4}&ProjMonitorCoords={5}&ProjOrg={6}&Parameters={7}&ResComp={8}&State={9}&Status={10}",
                            "description": "This service returns a list of sites that meet the passed-in values.",
                            "id": "Filtered Sites",
                            "parameters": [
                                { "name": "durationIDs", "type": "comma separated numbers", "description": "comma separated list of project duration IDs (ex: 1,2,3)", "optional": true, "value": "", "link": "../home", "linkName": "See Projects Durations },
                                { "name": "lakeIDs", "type": "comma separated numbers", "description": "comma separated list of lake IDs", "optional": true, "value": "", "link": "../home", "linkName": "See Lakes },
                                { "name": "mediaIDs", "type": "comma separated numbers", "description": "comma separated list of media type IDs", "optional": true, "value": "", "link": "../home", "linkName": "See Media Types },
                                { "name": "objIDs", "type": "comma separated numbers", "description": "comma separated list of objective type IDs", "optional": true, "value": "", "link": "../home", "linkName": "See Objective Types },
                                { "name": "monCoordIDs", "type": "comma separated numbers", "description": "comma separated list of monitoring coordination effort IDs", "optional": true, "value": "", "link": "../home", "linkName": "See Monitoring Coordination Efforts },
                                { "name": "orgID", "type": "number", "description": "organization ID that created the project that this site belongs to", "optional": true, "value": "", "link": "../home", "linkName": "See Organizations },
                                { "name": "parameterIDs", "type": "comma separated numbers", "description": "comma separated list of parameter type IDs", "optional": true, "value": "", "link": "../home", "linkName": "See Parameter Types },
                                { "name": "resCompIDs", "type": "comma separated numbers", "description": "comma separated list of resource type IDs", "optional": true, "value": "", "link": "../home", "linkName": "See Resource Types },
                                { "name": "states", "type": "comma separated strings", "description": "comma separated list of state names (ex: 'Michigan,Wisconsin')", "optional": true, "value": "", "link": "../home", "linkName": "See States },
                                { "name": "statusIDs", "type": "comma separated numbers", "description": "comma separated list of project status IDs", "optional": true, "value": "", "link": "../home", "linkName": "See Project Statuses }
                            ],
                            "availableMedia": [".xml", ".json", ".geojson"],
                            "selectedMedia": ".json",
                            "showMap": true
                        }
                    ]
                }

```
### A few things to note on "Site" Resource: 
1. AvailableMedia include ".geojson". When this is available, property "showMap" can be added to the uriList properties. 
2. The "optional" property can be added to "parameters" for those parameter values that are optional.
3. The Parameters can include "link" and "linkName" properties that can contain a link to the related information that will open in a new tab.
4. Update the index.html `<base href="">` to point to the Folder name in which it will reside.
5. This application can run only on an ec2 instance and not in S3, due to the nested routing needed to allow users to copy links and come back later to paste and go directly to that resource info page. Be sure to include the `web.config` file (located at the root) in the application folder at the same level as the index.html
