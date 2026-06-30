import data from "../data/CountryDetails.json"
import country from "../data/Countries.json"

async function main() {
    const len = Object.keys(data).length
    const len2 = country.length
    console.log("Length of Country Details data", len)
    console.log("Length of Countries Data", len2)
}

main()