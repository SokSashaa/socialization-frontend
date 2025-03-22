export const defaultConfigStylesForSearch = {
    control: (base, state) => ({
        ...base,
        ":hover": {borderColor: state.isFocused ? 'blue' : 'black'},
        borderColor: state.isFocused ? 'blue' : 'black',
        boxShadow: 'none',
        width: '100%',
        height: '55px',
    }),
    option: (base, state) => ({
        ...base,
        ":hover": {backgroundColor: 'gray', color: 'white'},
        backgroundColor: state.isSelected ? 'gray' : 'white',
        borderBottom: '1px solid gray',
        height: '30px',
        display: 'flex',
        alignItems: 'center',
    }),
    placeholder: (base) => ({
        ...base,
        color: 'black'
    }),
    menuList: (base) => ({
        ...base, padding: 0, margin: 0,
        borderRadius: '10px',
        border: '1px solid gray'
    }),
    menu: (base) => ({
        ...base,
        boxShadow: 'none',
    })
}
