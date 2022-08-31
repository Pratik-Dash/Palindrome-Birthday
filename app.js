const checkBtn = document.querySelector(".check-btn");
const calander  = document.querySelector("#birthdate");
const output = document.querySelector(".output");
checkBtn.addEventListener("click",()=>{

    var birthday = calander.value;
    if(birthday!="")
    {
    //1999-01-01
    var date = {day:'',month:'',year:''}
    birthdayArray = birthday.split('-');
    date.year = Number(birthdayArray[0]);
    date.month = Number(birthdayArray[1]);
    date.day = Number(birthdayArray[2]);
    var[Nextcount,nextPalindromedate] = getNextPalindromeDate(date)
    var[previousCount,previouspalindromeDate] = getPreviousPalindromeDate(date)
    console.log(Nextcount)
    console.log(previousCount)
    if(Nextcount<previousCount){
        if(Nextcount == 1)
        {
            output.innerText = `Uh oh! your birthday is not a Palindrome. The closest Palindrome date is ${nextPalindromedate.day}-${nextPalindromedate.month}-${nextPalindromedate.year}, which you missed by ${Nextcount} day.`
        }else{
            output.innerText = `Uh oh! your birthday is not a Palindrome. The closest Palindrome date is ${nextPalindromedate.day}-${nextPalindromedate.month}-${nextPalindromedate.year}, which you missed by ${Nextcount} days.`
        }
    }else if(previousCount<Nextcount){
        if(Nextcount == 1)
        {
        output.innerText = `Uh oh! your birthday is not a Palindrome. The closest Palindrome date is ${previouspalindromeDate.day}-${previouspalindromeDate.month}-${previouspalindromeDate.year}, which you missed by ${Nextcount} day.`
        }else{
            output.innerText = `Uh oh! your birthday is not a Palindrome. The closest Palindrome date is ${previouspalindromeDate.day}-${previouspalindromeDate.month}-${previouspalindromeDate.year}, which you missed by ${Nextcount} days.`
        }
    }
    else{
        output.innerText = `Yaay! your birthday is Palindrome!`
        output.style.color = "green"
        output.style.fontWeight = "900"
    }
}
else{
    output.innerText = "Birth date field cannot be empty. Please enter your date."
    output.style.color = "red"
}
    
    
})

function getReverseOfString(value){

   
    var valueToArray = value.split('');
    var reverseArray = valueToArray.reverse();
    var reverseString = reverseArray.join('');
    return reverseString
}
function checkPalindrome(value){

    var reverseString = getReverseOfString(value);
    if(value === reverseString){
        return true
    }
        return false

}

function convertDateToString(value){
    var stringDate = {
        day:'',
        month:'',
        year:'',
    }

    var day = value.day
    var month = value.month
    var year = value.year
    if(day<10){
        stringDate.day = '0'+day;
    }
    else{
        stringDate.day = day.toString()
    }
    if(month<10){
        stringDate.month = '0'+month;
    }
    else{
        stringDate.month = month.toString()
    }
    stringDate.year = year.toString()
   
    return stringDate
}
// DD-MM-YYYY
// MM-DD-YYYY
// YYYY-MM-DD
// DD-MM-YY
// MM-DD-YY
// YY-MM-DD
function generateDatePatterns(date){
    var d = convertDateToString(date)
    
    var dd_mm_yyyy = d.day+d.month+d.year
    var mm_dd_yyyy = d.month+d.day+d.year
    var yyyy_mm_dd = d.year+d.month+d.day
    var dd_mm_yy = d.day+d.month+d.year.slice(-2)
    var mm_dd_yy = d.month+d.day+d.year.slice(-2)
    //console.log(mm_dd_yy);
    var yy_mm_dd = d.year.slice(-2)+d.month+d.day

    return [dd_mm_yyyy,mm_dd_yyyy,yyyy_mm_dd,dd_mm_yy,mm_dd_yy,yy_mm_dd]
}

function checkPalindromeForAllPatterns(date){
    var allPatterns = generateDatePatterns(date)
    var flag = false
    var pattern
    for(var i = 0;i<allPatterns.length;i++)
    {
        if(checkPalindrome(allPatterns[i])){
            return true
        }
    }
    
    return false
}
function checkIfLeapYear(year){
    if(year%400 == 0){
        return true
    }
    if(year%100 == 0){
        return false
    }
    if(year%4 == 0){
        return true
    }
    return false
}

function getNextDate(dateobject){

    var day = dateobject.day;
    var month = dateobject.month;
    var year = dateobject.year;
    var daysInMonths = [31,28,31,30,31,30,31,31,30,31,30,31]
    day++;

    if(month === 2){
        if(checkIfLeapYear){
            if(day>29){
                day = 1;
                month++
            }
           
        }
        else{
            if(day>28){
                day =1;
                month++;
            }
        }
    }
    if(day>daysInMonths[month-1]&&month!=2){
        day = 1;
        month++;
    }
    if(month>12){
        year++;
        month = 1;
    }
    
    dateobject.day = day;
    dateobject.month = month;
    dateobject.year = year;
    return dateobject;
    
}


//pass
function getPreviousDate(dateobject){

    var day = dateobject.day;
    var month = dateobject.month;
    var year = dateobject.year;
    var daysInMonths = [31,28,31,30,31,30,31,31,30,31,30,31]
    day--;
    if(month === 3){
        if(checkIfLeapYear(year)){
            if(day<1){
                day = 29;
                month--;
            }
        }
        else{
            if(day<1){
                day = 28;
                month--;
            }
        }
    }

    if(day<1 && month!=3){

        day = daysInMonths[month-2];
        month--;
    }
    if(month<1){
        year--;
        month=12;
    }
    dateobject.day = day;
    dateobject.month = month;
    dateobject.year = year;
    return dateobject;

}



function getNextPalindromeDate(currentDate){
    //var nextPalindromeDate = getNextDate(currentDate);
    var date = currentDate
    var countOfDays = 0;
    while(1){
        
        if(checkPalindromeForAllPatterns(date)){
            break
        }
        date = getNextDate(date);
        countOfDays++;
        
        
    }
    return[countOfDays,date]
}

function getPreviousPalindromeDate(currentDate){
    var count = 0;
    var date = currentDate
    // var previousDate = getPreviousDate(currentDate);
  
    while(1) {
    
      if(checkPalindromeForAllPatterns(date)){
        break
      }
      date = getPreviousDate(date);
      count++
      

  }
  return[count,date]
}

// date = {
//     day:7,
//     month:7,
//     year:2020
// }
// console.log(getNextPalindromeDate(date))





