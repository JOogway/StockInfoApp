// Ustaw rozmiar i pozycje
var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 1200 - margin.left - margin.right,
    height = 540 - margin.top - margin.bottom;

// Ustaw format daty
var parseDate = d3.time.format("%Y-%m-%d").parse;

// Ustal skale
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// Opisz osie
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);

// Określ zawartość
var wartoscline = d3.svg.line()
    .x(function(d) { return x(d.data); })
    .y(function(d) { return y(d.wartosc); });
    
// Dodaj pole svg
var svg = d3.select("body")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");

// Pobierz z bazy danych
var data = d3.json("data.php", function(error, data) {
    data.forEach(function(d) {
        d.data = parseDate(d.data);
        d.wartosc = +d.wartosc;
    });

    // Skalowanie do ilości danych
    x.domain(d3.extent(data, function(d) { return d.data; }));
    y.domain([0, d3.max(data, function(d) { return d.wartosc; })]);

    // Podziałka
    svg.append("path")
        .attr("class", "line")
        .attr("d", wartoscline(data));

    // Dodanie X
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Dodanie Y
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);


  //Tworzenie tabeli
function tabulate(data, columns) {
    var table = d3.select("body").append("table")
            .attr("style", "margin-left: 250px"),
        thead = table.append("thead"),
        tbody = table.append("tbody");

    // append the header row
    thead.append("tr")
        .selectAll("th")
        .data(columns)
        .enter()
        .append("th")
            .text(function(column) { return column; });

    // create a row for each object in the data
    var rows = tbody.selectAll("tr")
        .data(data)
        .enter()
        .append("tr");

    // create a cell in each row for each column
    var cells = rows.selectAll("td")
        .data(function(row) {
            return columns.map(function(column) {
                return {column: column, wartosc: row[column]};
            });
        })
        .enter()
        .append("td")
        .attr("style", "font-family: Courier") // sets the font style
            .html(function(d) { return d.wartosc; });
    
    return table;
}

// render the table
 var peopleTable = tabulate(data, ["data", "wartosc"]);

});