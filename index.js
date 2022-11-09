(async () => {
    const { graphQL } = await require("./core")

    /**
     * Run your code here
     * Comment the sample below
     */
    let query = graphQL.query.policies.get_policies_by_email
    const response = await graphQL.execute({
        "email": "axle@cbo.me"
    }, query)

    console.log(JSON.stringify(response))
})()