
define([], function () {

    return {
        id: 'main',
        type: 'clean',
        rows: [
            {height: 49,
                id: "title",
                css: "title",
                template: "<div class='header'>#title# ( #details# )</div>",
                data: {
                    details: "all order",
                    title: "Order"
                }
            }, {
                type: "space",
                rows: [
                    {}
                ]
            }

        ]
    };
});