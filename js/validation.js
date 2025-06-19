errorMessage = "";   // global message


function validateEmail()
{
   var email, valid;
   email = document.register.email.value;
   valid = email.search(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})$/);  // evaluated as boolean
   // regular expressions emails, telephone numbers, cell numbers
   if (valid != 0)
   {
    document.register.errorMessage.value += "Email not valid!\n";
      return false;
   }
   else
     return true;
}
