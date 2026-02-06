@echo off
"C:\Program Files\Git\bin\git.exe" init
"C:\Program Files\Git\bin\git.exe" config --global user.name "Surjya Saha"
"C:\Program Files\Git\bin\git.exe" config --global user.email "binapani.surjyasaha@yahoo.com"
"C:\Program Files\Git\bin\git.exe" add .
"C:\Program Files\Git\bin\git.exe" commit -m "Initial commit: Binapani Automation website"
"C:\Program Files\Git\bin\git.exe" branch -M main
"C:\Program Files\Git\bin\git.exe" remote add origin https://github.com/Surjya003/Binapani.git
"C:\Program Files\Git\bin\git.exe" push -u origin main
pause
