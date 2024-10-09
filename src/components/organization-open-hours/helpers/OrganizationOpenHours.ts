
export const changeOpenHoursFormat = (hours: string) => {
    /*
    Regex: 
    8:30-3:30   ([0-9]{1,2}) ?: ?([0-9]{1,2}) ?- ?([0-9]{1,2}) ?: ?([0-9]{1,2})
    9-5     ([0-9]{1,2}) ?- ?([0-9]{1,2})
    7:30am-3:30pm   ([0-9]{1,2}) ?: ?([0-9]{1,2}) ?([a-z]{2}) ?- ?([0-9]{1,2}) ?: ?([0-9]{1,2}) ?([a-z]{2})
    8am-5pm     ([0-9]{1,2}) ?([a-z]{2}) ?- ?([0-9]{1,2}) ?([a-z]{2})
    null    null
    10am - 12pm; 1pm - 5pm       ([0-9]{1,2}) ?([a-z]{2}) ?- ?([0-9]{1,2}) ?([a-z]{2}); ([0-9]{1,2}) ?([a-z]{2}) ?- ?([0-9]{1,2}) ?([a-z]{2})
    1-6pm   ([0-9]{1,2}) ?- ?([0-9]{1,2}) ?([a-z]{2})
    2:00 pm to 6:00 pm      ([0-9]{1,2}) ?: ?([0-9]{1,2}) ?([a-z]{2}) to ([0-9]{1,2}) ?: ?([0-9]{1,2}) ?([a-z]{2})   

    Standardized date:
    HH:MMam - HH:MMpm
    */

    const hoursRegex = {
        "HH:MM-HH:MM": /([0-9]{1,2}) ?: ?([0-9]{1,2}) ?- ?([0-9]{1,2}) ?: ?([0-9]{1,2})/,
        "HH-HH": /([0-9]{1,2})-([0-9]{1,2})/,
        "HH:MMxx-HH:MMxx": /([0-9]{1,2}) ?: ?([0-9]{1,2}) ?([a-z]{2}) ?- ?([0-9]{1,2}) ?: ?([0-9]{1,2}) ?([a-z]{2})/,
        "HHxx-HHxx": /([0-9]{1,2}) ?([a-z]{2}) ?- ?([0-9]{1,2}) ?([a-z]{2})/,
        "HHxx-HHxx; HHxx-HHxx": /([0-9]{1,2}) ?([a-z]{2}) ?- ?([0-9]{1,2}) ?([a-z]{2}); ([0-9]{1,2}) ?([a-z]{2}) ?- ?([0-9]{1,2}) ?([a-z]{2})/,
        "HH-HHxx": /([0-9]{1,2}) ?- ?([0-9]{1,2}) ?([a-z]{2})/,
        "HH:MMxx to HH:MMxx": /([0-9]{1,2}) ?: ?([0-9]{1,2}) ?([a-z]{2}) to ([0-9]{1,2}) ?: ?([0-9]{1,2}) ?([a-z]{2})/
    }

    try {
        switch (true) {
            case hoursRegex["HH:MM-HH:MM"].test(hours):
                {
                    const regexGroups = hoursRegex["HH:MM-HH:MM"].exec(hours)
                    let standardizedDate = ``
                    if (regexGroups?.[1]! > regexGroups?.[3]!) {
                        standardizedDate = `${regexGroups?.[1]}:${regexGroups?.[2]}am - ${regexGroups?.[3]}:${regexGroups?.[4]}pm`
                    } else {
                        standardizedDate = `${regexGroups?.[1]}:${regexGroups?.[2]}pm - ${regexGroups?.[3]}:${regexGroups?.[4]}pm`
                    }

                    return standardizedDate
                }
            case hoursRegex["HH-HHxx"].test(hours):
                {
                    const regexGroups = hoursRegex["HH-HHxx"].exec(hours)
                    const standardizedDate = `${regexGroups?.[1]}:00${regexGroups?.[3]} - ${regexGroups?.[2]}:00${regexGroups?.[3]}`
                    return standardizedDate
                }
            case hoursRegex["HH-HH"].test(hours):
                {
                    const regexGroups = hoursRegex["HH-HH"].exec(hours)
                    let standardizedDate = ``
                    if (regexGroups?.[1]! > regexGroups?.[2]!) {
                        standardizedDate = `${regexGroups?.[1]}:00am - ${regexGroups?.[2]}:00pm`
                    } else {
                        standardizedDate = `${regexGroups?.[1]}:00pm - ${regexGroups?.[2]}:00pm`
                    }

                    return standardizedDate
                }
            case hoursRegex["HH:MMxx-HH:MMxx"].test(hours):
                {
                    const regexGroups = hoursRegex["HH:MMxx-HH:MMxx"].exec(hours)
                    const standardizedDate = `${regexGroups?.[1]}:${regexGroups?.[2]}${regexGroups?.[3]} - ${regexGroups?.[4]}:${regexGroups?.[5]}${regexGroups?.[6]}`
                    return standardizedDate
                }
            case hoursRegex["HHxx-HHxx"].test(hours):
                {
                    const regexGroups = hoursRegex["HHxx-HHxx"].exec(hours)
                    const standardizedDate = `${regexGroups?.[1]}:00${regexGroups?.[2]} - ${regexGroups?.[3]}:00${regexGroups?.[4]}`
                    return standardizedDate
                }
            case hoursRegex["HHxx-HHxx; HHxx-HHxx"].test(hours):
                {
                    const regexGroups = hoursRegex["HHxx-HHxx; HHxx-HHxx"].exec(hours)
                    const standardizedDate = `${regexGroups?.[1]}:00${regexGroups?.[2]} - ${regexGroups?.[3]}:00${regexGroups?.[4]}; ${regexGroups?.[5]}:00${regexGroups?.[6]} - ${regexGroups?.[7]}:00${regexGroups?.[8]}`
                    return standardizedDate
                }

            case hoursRegex["HH:MMxx to HH:MMxx"].test(hours):
                {
                    const regexGroups = hoursRegex["HH:MMxx to HH:MMxx"].exec(hours)
                    const standardizedDate = `${regexGroups?.[1]}:${regexGroups?.[2]}${regexGroups?.[3]} - ${regexGroups?.[4]}:${regexGroups?.[5]}${regexGroups?.[6]}`
                    return standardizedDate
                }
            default:
                return hours

        }

    } catch (_) {
        return hours
    }

}

