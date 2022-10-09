const button = document.getElementById("submit-data");
const text = document.getElementById("input-area");

const jsonQuery = {
    "query": [
        {
            "code": "Vuosi",
            "selection": {
                "filter": "item",
                "values": ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015", "2016","2017","2018","2019","2020","2021"
                ]
            }
        },
        {
            "code": "Alue",
            "selection": {
                "filter": "item",
                "values": [
                    "SSS"
                ]
            }
        },
        {
            "code": "Tiedot",
            "selection": {
                "filter": "item",
                "values": [
                    "vaesto"
                ]
            }
        }
    ],
    "response": {
        "format": "json-stat2"
    }
}


const fetchData = async() => {
    const url = "https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px"
    const res = await fetch(url,{
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(jsonQuery)
    })
    if(!res.ok){
        return;
    }
    const data = await res.json()
    return data;
}

const makeChart = async() => {
    const data = await fetchData()
    console.log(data)
    const years = Object.values(data.dimension.Vuosi.category.label);
    const regions = Object.values(data.dimension.Alue.category.label);
    const info = Object.values(data.dimension.Tiedot.category.label);

    const yearlist = []
    for(var i=0;i<years.length;i++){
        yearlist.push(years[i])
    }
    console.log(yearlist)

    const chartdata = {
        labels: yearlist,
        datasets: []
    }

    const chart = new frappe.Chart("#chart",{
        title: "Example title",
        data: chartdata,
        type: "line",
        height: 450,
        color: "#eb5146"
    })
}
makeChart();
