$("#btnUserClear").click(function () {
    clearUserForm();
  });
  
  $("#frmUserForm").submit(function () { //Event : submitting the form
    saveUserForm();
    return true;
  });
  
  function checkUserForm() { //Check for empty fields in the form
    //for finding current date 
    var d = new Date();
    var month = d.getMonth() + 1;
    var date = d.getDate();
    var year = d.getFullYear();
    var currentDate = year + '/' +
      (('' + month).length < 2 ? '0' : '') +
      month + '/' +
      (('' + date).length < 2 ? '0' : '') + date;
  
    if (($("#txtFirstName").val() != "") &&
      ($("#txtLastName").val() != "") &&
      ($("#txtU.SAppointmentDate").val() != "") &&
      ($("#datBirthdate").val() != "") && ($(
        "#datBirthdate").val() <= currentDate) &&
      ($("#slcImmigartionType option:selected").val() !=
        "Select Immigartion Type")) {
      return true;
    } else {
      return false;
    }
  }
  
  function saveUserForm() {
    if (checkUserForm()) {
      var user = {
        "FirstName": $("#txtFirstName").val(),
        "LastName": $("#txtLastName").val(),
        "U.SAppointmentDate": $(
          "#txtU.SAppointmentDate").val(),
        "NewPassword": $("#changePassword").val(),
        "DOB": $("#datBirthdate").val(),
        "ImmigartionType": $(
          "#slcImmigartionType option:selected").val(),
        
      };
  
      try {
        localStorage.setItem("user", JSON.stringify(
          user));
        alert("Saving Information");
  
        $.mobile.changePage("#pageMenu");
        window.location.reload();
      } catch (e) {
        /* Google browsers use different error 
         * constant
         */
        if (window.navigator.vendor ===
          "Google Inc.") {
          if (e == DOMException.QUOTA_EXCEEDED_ERR) {
            alert(
              "Error: Local Storage limit exceeds."
            );
          }
        } else if (e == QUOTA_EXCEEDED_ERR) {
          alert("Error: Saving to local storage.");
        }
  
        console.log(e);
      }
    } else {
      alert("Please complete the form properly.");
    }
  
  }
  
  function clearUserForm() {
    localStorage.removeItem("user");
    alert("The stored data have been removed");
    
    $("#slcImmigartionType").val("Select Immigartion Type");
    $('#slcImmigrationType').selectmenu('refresh',
      true);
    
  }
  
  function showUserForm() { //Load the stored values in the form
    try {
      var user = JSON.parse(localStorage.getItem(
        "user"));
    } catch (e) {
      /* Google browsers use different error 
       * constant
       */
      if (window.navigator.vendor ===
        "Google Inc.") {
        if (e == DOMException.QUOTA_EXCEEDED_ERR) {
          alert(
            "Error: Local Storage limit exceeds."
          );
        }
      } else if (e == QUOTA_EXCEEDED_ERR) {
        alert("Error: Saving to local storage.");
      }
  
      console.log(e);
    }
  
    if (user != null) {
      $("#txtFirstName").val(user.FirstName);
      $("#txtLastName").val(user.LastName);
      $("#txtU.SAppointmentDate").val(user.U.SAppointmentDate);
      $("#changePassword").val(user.NewPassword);
      $("#datBirthdate").val(user.DOB);
      $('#slcU.SAppointmentDateType option[value=' + user.U.SAppointmentDateType +
        ']').attr('selected', 'selected');
      $("#slcU.SAppointmentDateType option:selected").val(
        user.U.SAppointmentDateType);
      $('#slcImmigrationType').selectmenu('refresh',
        true);
      
    }
  }