
# Bevy Automator

Nodejs script to upload attendees from excel to bevy platform


### Requirements
1) Nodejs

Install Node.js from https://nodejs.org/en/download/, based on your system requirements.

![Nodejs download](https://miro.medium.com/v2/resize:fit:828/format:webp/1*PomXLSNcwBejr1ODpEJAfA.png)


2) Email with 2 factor authentication disabled

## Install Locally

### Clone the project

```bash
  git clone https://github.com/DSC-UIT-khi/Bevy-Automation.git
```

### Go to the project directory

```bash
  cd Bevy-Automation
```

### Install dependencies

```bash
  npm install
```


### Edit .env file and enter your values. 

```bash
 DASHBOARD_LINK='https://gdsc.community.dev/accounts/dashboard/'
 LIVE_EVENT_LINK='https://gdsc.community.dev/accounts/dashboard/#/chapter-194/event-60381/manage'
 EMAIL='xxxxxxxxxxxx'
 PASSWORD='xxxxxxxxxxxx'
 FILE_NAME='data.xlsx'
```

### LIVE_EVENT_LINK
![LIVE EVENT LINK](https://raw.githubusercontent.com/hamzahoda/Bevy-Attendee-Automation/main/LIVE-EVENT-LINK.jpg)




## Upload your excel file in root of the project and update it's name in .env file.

### Excel Format

Column1 first name

Column2 Last name

Column3 Email

## Running the project
```bash
 npm start
```
## Authors

- [@SyedHamzaHoda](https://www.github.com/hamzahoda)


## Demo
Please view the demo of the project here.

https://youtu.be/8i6m4MqcKw0
