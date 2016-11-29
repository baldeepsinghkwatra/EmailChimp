EmailChimp.view('MainToolbar', {
    layout: {
        view: "toolbar",
        elements: [
            {height: 46, view: "label", label: "EMAIL CHIMP", width: 200},
            {},
            { margin: 10,view:"icon", icon:"user", popup:EmailChimp.account}
        ]
    }
});

function logout()
{
    window.location.href = "logout";
}