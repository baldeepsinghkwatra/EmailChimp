EmailChimp.view('MainToolbar', {
    layout: {
        view: "toolbar",
        elements: [
            {height: 46, view: "label", label: "EMAIL CHIMP", width: 200},
            {},
            {view:"icon", icon:"user", popup:EmailChimp.account},
            {view: "icon", icon: "power-off", padding: 200, click: "logout"}
        ]
    }
});

function logout()
{
    window.location.href = "logout";
}