async function getAllWorkItemsForIds(witApi, fields, readIds) {
    let allWork = []
    const chunk = 200  // API limitation
    while (readIds.length > 0) {
        let ids = readIds.filter((_, i) => i < chunk)
        const items = witApi.getWorkItemsBatch({ fields, ids })
        allWork = allWork.concat(items)
        readIds = readIds.filter((_, i) => i >= chunk)
    }
    return (await Promise.all(allWork))
        .reduce((a, _) => a.concat(_), [])
        .map( x => ({
            ...x,
            fields: (({
                ...x.fields,
                ...(fields
                    .filter(_ => !x.fields[_])
                    .reduce((obj, _) => ({ ...obj, [_]: '', }), {}))
            }))
        }))
}

exports.getAllWorkItemsForIds = getAllWorkItemsForIds