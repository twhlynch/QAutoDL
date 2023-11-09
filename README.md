# QAutoDL

> Currently not working. Not gonna lie to ya, i'm just waiting for DownQ to update so I can "borrow" it's code

### Automatically download Oculus VR apps right from your Browser.

Built off DownQuest but instead of allowing you do get old versions of apps, it lets you downoad the most recent release, and does it automatically. Very useful if you are modding games.

#### Tutorial
- Install this Extension
- Navigate to https://www.oculus.com/experiences/quest/
- Login with your Facebook/Oculus account
- Go to the app you want to downgrade/download
- Wait for the download to finish and use ADB to sideload the APK

### Scripts
Located in `/Scripts` are some useful scripts to use with this extention.

**search.py**

Easily run multiple searches for apps through oculusDB and automatically open the results.

`search.py [-h] app_list`

app_list is a comma separated list of app names, or oculus experience urls.

>Contains code from https://github.com/basti564/DownQuest
