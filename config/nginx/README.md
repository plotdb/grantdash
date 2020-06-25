# Nginx Configuration Structure

grantdash uses root -> server -> domain config structure, and additional cert config for initializing SSL.

 * root - root config of nginx. minimal config is to include server config.
 * server - specify server related configurations, including path, domain name, and include all custom domain configs.
 * domain - specify org / brd configurations if domain is assigned.
 * cert - used when setup certification for SSL.

Sample for all configs can be found under `templates` folder, and can be generated using `domain.ls`.


## Config file generation

run `init.ls` and `domain.ls` to generate server-wide or domain-based configurations.

 * `lsc init.ls <domain-name>`
 * `lsc domain.ls [domain-name] [org-slug] <brd-slug>`


# Subfolders

domains/<domain>
 - domain specific configs, e.g., : domains/mydash.io
 - 3 types of config under domain folder
   - org.config - for org configuration
   - brd.<slug>.config - for specifi brd configuration
   - custom.config - manually maintained, to be included by org / brd.
     - custom config should be able to be maintained from UI in the future. we won't need custom.config then.

modules
 - common parts across different domains and servers. should not contain server / domain specific information
 - with following modules
   - http.config - http related request goes here. force redirect to https.
   - https.config - basic config
   - dash.config - all grantdash related files under /dash/ route.
   - proxy.config - proxy settings. 
   - upstream.config - upstream information ( name, ip and port )

servers
 - for using in a standalone server, as entry point. will be ignored by gitignore

templates
 - for generating config in domains and servers.
 - possible params:
   - domain-name
   - root
   - user-root
   - org-slug
   - brd-slug
 - options
   - standalone
   - use-brd-root
