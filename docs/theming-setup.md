# Application Themining

Application theming and deploying application to the server involves 4 major steps as below

1. Theme Configuration in Code 
2. Jenkin Server Configuration
3. Deployment Server Configuration
4. Apache Server Configuration

## 1. Theme Configuration in Code

Following tree structure depict the necessary file and folder involved in the application theming

<pre>

📦work-permit-workbench-web
 ┣ 📂src
 ┃ ┣ 📂app
 ┃ ┃ ┣ 📂modules
 ┃ ┃ ┣ 📂theme
 ┃ ┃ ┃ ┣ 📂all-theme
 ┃ ┃ ┃ ┃ ┣ 📜blue-theme.ts
 ┃ ┃ ┃ ┃ ┣ 📜nwl-theme.ts
 ┃ ┃ ┣ 📂nwl
 ┃ ┃ ┃ ┗ 📂images
 ┃ ┃ ┃ ┃ ┣ 📂flags
 ┃ ┃ ┃ ┃ ┃ ┣ 📜cost.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜gray.png
 ┃ ┃ ┃ ┃ ┣ 📜logo.png
 ┃ ┃ ┣ 📂skewb
 ┃ ┃ ┃ ┗ 📂images
 ┃ ┃ ┃ ┃ ┣ 📂flags
 ┃ ┃ ┃ ┃ ┃ ┣ 📜cost.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜gray.png
 ┃ ┃ ┃ ┃ ┣ 📜logo.png
 ┃ ┣ 📂environments
 ┃ ┃ ┣ 📂nwl
 ┃ ┃ ┃ ┣ 📜environment.prod.ts
 ┃ ┃ ┃ ┗ 📜environment.ts
 ┃ ┃ ┣ 📂skewb
 ┃ ┃ ┃ ┣ 📜environment.prod.ts
 ┃ ┃ ┃ ┗ 📜environment.ts
 ┣ 📜angular.json
 
</pre>
 
Theme configuration in the code is further divided into 3 parts as below
> * Color Palette 
> * Resources 
> * Environment  


  **Color Palette**  
All the color associated with client brand theme will be configured into the seperate theme file and all the theme files will be stored into to folder as shown below

<pre>
src -> app -> theme -> all-theme
</pre>

Inside **all-theme** folder, seperate file for each client will be place with the naming convention \<client>-theme.ts.   
E.g. For NWL client file name will be **nwl-theme.ts**   
This file will contain all the theming veriable and required color in hex format

  **Resources**    
Here resources are referred to the client branding logo and the images in the client theming color. 
Just like color palette resources are also kept in the folder with specific format as mentioned below
```
src -> app -> theme -> <client>
```
In above folder structure we can find the different logo and other image resource based on the client branding 
```
src -> app -> theme -> nwl --> Image resources
src -> app -> theme -> skewb -->  Image resources
```

  **Environment Configuration**  
After completing changes in the color palette and adding appropriate resources based on the client, now it's time to configure it correctly.  
In root folder of the application, open the angular.json file and find the ```configurations``` section. Then copy & paste the configuration from ```skewb``` and rename it correctly with client name. Following image shows the configuration changes for the NWL client.

![image](https://user-images.githubusercontent.com/72465153/131861541-95749b37-5a4a-4a60-a4c3-57a5f5c493da.png)

After renaming the client name jump to the ```asset``` & ```fileReplacements``` section and make necessary changes as mentioned below   


![image](https://user-images.githubusercontent.com/72465153/131864420-2463d146-c3a8-4bf0-a125-e11ce4f841e1.png)


![image](https://user-images.githubusercontent.com/72465153/131864536-4987997c-3a2b-4405-9bc6-69fa8527f72f.png)


![image](https://user-images.githubusercontent.com/72465153/131864608-88fd13d2-1dfd-44e0-89a0-13f9274a2300.png)

  
    
## Jenkin Server Configuration
For build the application with the correct client configuration.    
Changes in the ```client choises``` to be made as shown below  
**Please note that this name should be matched with the configuration section of the angular.json file**
  
    
![image](https://user-images.githubusercontent.com/72465153/131961092-4d9f6df9-2d0c-41a7-b764-ddbd9a62f7d9.png)


## Deployment Server Configuration
On deployment Serve new folder to be created with the client name 
![image](https://user-images.githubusercontent.com/72465153/131958562-d91ba015-1cfe-4a2a-9fcc-349082ee2763.png)

Here we have created the folder name nwl and copy the folder structure avaialble in skewb folder. This structure is as below 

```<client>/<deployment type>/permit-manager/<application name> /<application web content>```
<pre>

skewb/dev/permit-manager/launchpad/
skewb/dev/permit-manager/workbench/

skewb/uat/permit-manager/workbench/
skewb/uat/permit-manager/permit-mgr/
</pre>


## Apache Server Configuration
Open the file ```000-default-le-ssl.conf``` from the location ```/etc/apache2/sites-enabled``` 


![image](https://user-images.githubusercontent.com/72465153/131959434-81580ba1-54ac-445d-8722-2a54df972279.png)

<pre>
cd /etc/apache2/sites-enabled
vi 000-default-le-ssl.conf
</pre>

Now move to the appropriate location to add VirtualHost configruration section and make sure that your application is pointed correctly to the location

![image](https://user-images.githubusercontent.com/72465153/131960684-3856658a-2ede-4d36-9b31-4cf52d45d79a.png)


  **Port Configuration**  

After completing VirtualHost configruration, we need to listen on this port and this configuration can be done from **port.config** file
<pre>
cd /etc/apache2
vi ports.conf
</pre>

Now append the line with the appropriate port number 

<pre>
Listen 1002
</pre>

![image](https://user-images.githubusercontent.com/72465153/131962517-c9a094ed-d1df-4957-a068-fbe6c1fbfd29.png)


