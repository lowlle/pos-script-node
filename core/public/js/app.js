(function (request) {

    const get = (url, callback) =>
        request.get(url)
        .then(callback)
        .catch(error => console.log(error))


    const render = (element, pattern, substitute) => {
        element.innerHTML = element.innerHTML.replace(pattern, substitute)
        element.classList.remove("text-center")
    }

    get('/readme.raw', ({
            data
        }) =>
        render(
            document.getElementById("readme"),
            /({{){1}.*(README.md){1}.*(}}){1}/gm,
            data
        )
    )

    const bakeElement = (type, value) => {
        const element = document.createElement(type)
        element.innerHTML = value
        return element
    }

    const formatTreeNodes = (tree, callback) => {
        const keys = Object.keys(tree)
        const node = keys.sort()
        let pending = node.length
        while (!!pending)
            callback(tree, node[--pending], isObject(tree[node[pending]]))
    }

    const isObject = value => value && typeof value === 'object' && value.constructor === Object

    const createBranch = (tree, node, elem) => {
        const branch = document.createElement('ul')
        formatTreeNodes(tree[node], (source, node, hasChild) => {
            const child = document.createElement('li')

            child.prepend(bakeElement('span', node))

            hasChild ?
                child.replaceWith(createBranch(source, node, child)) :
                child.appendChild(bakeElement('pre', source[node]))

            branch.prepend(child)
            elem.appendChild(branch)
        })
        return elem
    }

    const createTree = (data) => {
        const rootNode = document.createElement("ul")
        formatTreeNodes(data, (tree, node) => {
            let elem = document.createElement('li')
            elem.prepend(bakeElement('span', node))
            if (Object.keys(tree[node]).length)
                elem = createBranch(tree, node, elem)

            rootNode.prepend(elem)
        })
        return rootNode
    }

    get('/graphql-tree', ({
        data
    }) => {
        const tree = createTree(data)
        const element = document.getElementById("graphql-tree")
        element.innerHTML = document.createElement('div')
        element.firstChild.replaceWith(tree)
        element.classList.remove("text-center")
    })

})(axios)