#!/bin/sh

Xvfb -ac :99 &
export DISPLAY=:99
/usr/bin/java -jar $PWD/selenium-server-standalone-2.32.0.jar &
