# Prerequisites
 - Environment:
	+ IIS > 7
	+ .Net Core framework 2.1
	+ NodeJS: v8.9.4
	+ NPM: 6.4.1
	+ Gulp: 3.9.1
		
 - Front-end:
	+ Angular: 5.4.0
	+ Angular/CLI: 1.7.4
		
 - Bank-end:
	+ Visual studio 2017

# Back-end:
 - Open "DFO.sln" with Visual Studio 2017
 - Build DFO.sln with Release mode
 - Publish MainAPI.
	+ Select MainAPI project (right click on project name)
	+ Select "publish" menu item
	+ Press "Publish" button
	+ Check package in {Project_dir}/Output/Release/publish/MainAPI
	+ Run "MainAPI.exe"
	+ Allow firewall network for MainAPI
	
	Note: The application must run on port 5000
		
# Front-end:
 - Directory to MainSPA folder. Clean dist & app folder for re-deploy
 - Start cmd
 ```
   npm install
   npm run build-prod
   gulp production
 ```
  => Deployment folder: {Project_dir}/MainSPA/app
 - IIS configuration:
 + In "Application Pools" create DFOAppPool
 	- .NET CLR: v4.0
 	- Managed Pipeline Mode: Integrated
 + In "Sites". Add Website
 	- Application Pool Select: DFOAppPool
 	- Site Name: MainSPA
 	- Physical path: {Project_dir}/MainSPA/app
 	- Port: 8000
 + Start website: http://localhost:8000
