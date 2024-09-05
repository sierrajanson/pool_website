import Item from './Item';
const Results = () => {



    return(
        <div class="text-center pt-20 pb-20">
            <h1 class="text-2xl font-bold tracking-tight text-indigo-900 sm:text-4xl"> Estimates for Your Pool</h1>
            <p class="mt-3 text-base leading-8 text-gray-600">Quotes from our sources for a UV, Lagoon styled pool with plants and a grill: </p>
            {/* <h1 class="text-1xl text-left font-bold tracking-tight text-gray-900 sm:text-2xl"> Exact Matches</h1> */}
            <p class="mt-3 text-base leading-8 text-gray-600">Sorry, we don't have any estimates that exactly match your search. Here are our closest matches:</p>

            {/* <h1 class="text-1xl text-left font-bold tracking-tight text-gray-900 sm:text-2xl"> Close Options</h1> */}
            <div className="resultsTable">
                <div class="relative overflow-x-auto">
                    <table class="w-full mt-10 text-sm text-left rtl:text-right text-gray-400 dark:text-gray-300">
                        <thead class="text-xs text-indigo-700 uppercase bg-gray-50 dark:bg-indigo-700 dark:text-indigo-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Company
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Pool Type
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Sanitation
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Features
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Landscaping
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Size 
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Issue Date
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Price
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((row) => (
                                <Item
                                    name={row['company_id']}
                                    sanitation={row['sanitation_system']}
                                    type={row['shape']}
                                    size={row['size']}
                                    features={formFeature(row)}
                                    landscaping={formLandscaping(row)}
                                    date={row['issue_date']}
                                    price={row['price']}
                                />    
                            )
                            )
                            }                    
                        </tbody>
                    </table>
                </div>
                
                <h1 class="mt-2 text-right cursor-pointer">More Results <span aria-hidden="true">&#709;</span></h1>
                <a href="#form" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Take Form Again</a>

            </div>
        </div>
    );
}

export default Results;