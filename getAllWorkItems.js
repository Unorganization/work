export async function getAllWorkItemsForIds(witApi, fields, readIds) {
    let allWorkItems = [];
    const chunk = 200;  // API limitation
    while (readIds.length > 0) {
        const ids = readIds.filter((_, i) => i < chunk);
        allWorkItems = allWorkItems.concat(await witApi.getWorkItemsBatch({ fields, ids }));
        readIds = readIds.filter((_, i) => i >= chunk);
    }
    return allWorkItems;
}
