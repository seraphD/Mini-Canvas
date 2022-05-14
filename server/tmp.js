const data = {
    tabs: [{"name":"Home","visible":true},{"name":"Announcement","visible":true},{"name":"Assignment","visible":true},{"name":"Grade","visible":true},{"name":"Files","visible":true},{"name":"Discussions","visible":true},{"name":"People","visible":true}],
    homepage: [{"type":"paragraph","children":[{"text":" Welcome","bold":true}]}]
}

const s = JSON.stringify(data)
console.log(JSON.parse(s));