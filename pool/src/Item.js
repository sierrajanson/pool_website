const Item = (props) => {
    return(
        <tr class="bg-white border-b dark:bg-indigo-800 dark:border-indigo-700">
            <th scope="row" class="text-xs px-6 py-4 font-medium text-indigo-900 whitespace-nowrap dark:text-white">
                {props.name}
            </th>
            <td class="text-xs px-6 py-4">
                {props.type}
            </td>
            <td class="text-xs px-6 py-4">
                {props.sanitation}
            </td>
            <td class="text-xs px-6 py-4">
                {props.features}
            </td>
            <td class="text-xs px-6 py-4">
                {props.landscaping}
            </td>
            <td class="text-xs px-6 py-4">
                {props.size}
            </td>
            <td class="text-xs px-6 py-4">
                {props.date}
            </td>
            <th scope="row" class="text-xs px-6 py-4 font-medium text-indigo-900 whitespace-nowrap dark:text-white">
                ${props.price}
            </th>
        </tr>
    );

}

export default Item;