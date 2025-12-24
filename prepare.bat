@echo off
setlocal ENABLEDELAYEDEXPANSION
set JAVA_HOME=C:\Users\HP\.jdks\corretto-17.0.17
set MAVEN_HOME=D:\Code\maven\apache-maven-3.9.12-bin\apache-maven-3.9.12
set PATH=%JAVA_HOME%\bin;%MAVEN_HOME%\bin;%PATH%
java -version
mvn -version
sam --version