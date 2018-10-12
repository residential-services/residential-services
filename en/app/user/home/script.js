





// TODO: Handle email confirmation link. See https://docs.mongodb.com/stitch/authentication/userpass/index.html#create-a-new-user-account

// TODO: Handle Password reset link. See https://docs.mongodb.com/stitch/authentication/userpass/index.html#reset-a-user-s-password

// TODO: UI in 3 languages, detect language from path

// TODO: plug this UI into the Equa site.



// 𝟏 Registration
$('#registrationDialog').modal({
    backdrop: false,
    keyboard: true,
    focus: true,
    show: false
});
$( "#registrationDialogRegister" ).on( "click", function() {
    $('#registrationDialog').modal('hide');
    if ($('#registrationDialogPwd').val() ===  $('#registrationDialogPwd2').val()) {
        my.stitch.account.register(
            $('#registrationDialogEmail').val(),
            $('#registrationDialogPwd').val()
        ).then(() => {
            $('#registrationDoneDialogText').text('To complete your registration, please click on the link in the email we have just sent you!');
            $('#registrationDoneDialogRetry').hide();
            $('#registrationDoneDialogOk').show();
            $('#registrationDoneDialog').modal('show');
        }).catch(err => {
            if (`${err}`.match(/password/i)) {
                $('#registrationDoneDialogText').text(`Please retry registering. Password must be between 6 and 128 characters.`);
            } else {
                $('#registrationDoneDialogText').text(`Please retry registering. Email address already in use.`);                
            }
            $('#registrationDoneDialogRetry').show();
            $('#registrationDoneDialogOk').hide();
            $('#registrationDoneDialog').modal('show');
        });
    } else {
        $('#registrationDoneDialogText').text('Please retry registering. The two passwords must be the same.');
        $('#registrationDoneDialogRetry').show();
        $('#registrationDoneDialogOk').hide();
        $('#registrationDoneDialog').modal('show');
    }
});
$( "#registrationDialogLogin" ).on( "click", function() {
    $('#registrationDialog').modal('hide');
    $('#loginDialog').modal('show');
});


// 𝟐 After registration
$('#registrationDoneDialog').modal({
    backdrop: false,
    keyboard: true,
    focus: true,
    show: false
});
$( "#registrationDoneDialogRetry" ).on( "click", function() {
    $('#registrationDoneDialog').modal('hide');
    $('#registrationDialogEmail').val('');
    $('#registrationDialogPwd').val('');
    $('#registrationDialog').modal('show');
});    


// 𝟑 Login
$('#loginDialog').modal({
    backdrop: false,
    keyboard: true,
    focus: true,
    show: false
});
$( "#loginDialogLogin" ).on( "click", function() {
    $('#loginDialog').modal('hide');
    my.stitch.account.signIn(
        $('#loginDialogEmail').val(),
        $('#loginDialogPwd').val()
    ).then(() => {
        $('#loginDoneDialogText').text('Successfully signed in!');
        $('#loginDoneDialogRetry').hide();
        $('#loginDoneDialogOk').show();
        $('#loginDoneDialog').modal('show');
    }).catch(err => {
        $('#loginDoneDialogText').text(`Please retry signing in. Email and/or password unknown. ${err}`);
        $('#loginDoneDialogRetry').show();
        $('#loginDoneDialogOk').hide();
        $('#loginDoneDialog').modal('show');
    });
});
$( "#loginDialogRegister" ).on( "click", function() {
    $('#loginDialog').modal('hide');
    $('#registrationDialog').modal('show');
});


// 𝟒 After login
$('#loginDoneDialog').modal({
    backdrop: false,
    keyboard: true,
    focus: true,
    show: false
});
$( "#loginDoneDialogRetry" ).on( "click", function() {
    $('#loginDoneDialog').modal('hide');
    $('#loginDialogEmail').val('');
    $('#loginDialogPwd').val('');
    $('#loginDialog').modal('show');
});    



// my.stitch.db = my.stitch.client
//     .getServiceClient(stitch.RemoteMongoClient.factory, "mongodb-atlas")
//     .db('equa');
// my.stitch.db.collection('collectionname').find()

if (!my.stitch.client.auth.user) {
    // not signed in
    if (my.vars.query.action === 'sign-in') {
        $('#loginDialog').modal('show');
    }else{
        $('#registrationDialog').modal('show');
    }

} else {
    // signed in
    
}

