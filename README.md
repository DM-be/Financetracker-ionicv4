# Financetracker-ionicv4
Financetracker being reworked in ionic v4 with Firebase.

## Description

This application has the same concept of the [previous version](https://github.com/DM-be/Financetracker-ionicv3) but is now being rebuilt using Firebase.
Firebase provides an easy to use signup API and RxJS compatible database. 
Instead of keeping track of every expense per month, per category, the idea is to track all expenses in one single collection.
This collection has data about the starting balance of accounts, every expense has an account property. 
Instead of saving all expenses on a monthoverview object, now I use the Firestore API to filter the expenses between the start of the month and the end of the month.
The balance of any account can be deduced by simply removing all expenses from the account until a given date, and adding or removing transactions (such as monthly earnings).
