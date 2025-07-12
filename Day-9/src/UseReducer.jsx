import React, { useReducer } from 'react'

// Example 1: Shopping Cart with useReducer
const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            // Check if item already exists in cart
            const existingItem = state.items.find(item => item.id === action.payload.id)
            if (existingItem) {
                // If item exists, increase quantity
                return {
                    ...state,
                    items: state.items.map(item =>
                        item.id === action.payload.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                    totalItems: state.totalItems + 1,
                    totalPrice: state.totalPrice + action.payload.price
                }
            } else {
                // If item doesn't exist, add new item
                return {
                    ...state,
                    items: [...state.items, { ...action.payload, quantity: 1 }],
                    totalItems: state.totalItems + 1,
                    totalPrice: state.totalPrice + action.payload.price
                }
            }

        case 'REMOVE_ITEM':
            const itemToRemove = state.items.find(item => item.id === action.payload)
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload),
                totalItems: state.totalItems - itemToRemove.quantity,
                totalPrice: state.totalPrice - (itemToRemove.price * itemToRemove.quantity)
            }

        case 'UPDATE_QUANTITY':
            const { id, quantity } = action.payload
            const item = state.items.find(item => item.id === id)
            const quantityDiff = quantity - item.quantity

            return {
                ...state,
                items: state.items.map(item =>
                    item.id === id ? { ...item, quantity } : item
                ),
                totalItems: state.totalItems + quantityDiff,
                totalPrice: state.totalPrice + (item.price * quantityDiff)
            }

        case 'CLEAR_CART':
            return {
                items: [],
                totalItems: 0,
                totalPrice: 0
            }

        default:
            return state
    }
}

// Example 2: Todo List with useReducer
const todoReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                ...state,
                todos: [...state.todos, {
                    id: Date.now(),
                    text: action.payload,
                    completed: false,
                    createdAt: new Date().toLocaleString()
                }],
                totalTodos: state.totalTodos + 1
            }

        case 'TOGGLE_TODO':
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload
                        ? { ...todo, completed: !todo.completed }
                        : todo
                )
            }

        case 'DELETE_TODO':
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload),
                totalTodos: state.totalTodos - 1
            }

        case 'EDIT_TODO':
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload.id
                        ? { ...todo, text: action.payload.text }
                        : todo
                )
            }

        default:
            return state
    }
}

// Example 3: Form Management with useReducer
const formReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_FIELD':
            return {
                ...state,
                [action.field]: action.value,
                errors: {
                    ...state.errors,
                    [action.field]: '' // Clear error when user types
                }
            }

        case 'SET_ERROR':
            return {
                ...state,
                errors: {
                    ...state.errors,
                    [action.field]: action.message
                }
            }

        case 'RESET_FORM':
            return {
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                errors: {}
            }

        default:
            return state
    }
}

const UseReducer = () => {
    // Shopping Cart State
    const [cartState, cartDispatch] = useReducer(cartReducer, {
        items: [],
        totalItems: 0,
        totalPrice: 0
    })

    // Todo List State
    const [todoState, todoDispatch] = useReducer(todoReducer, {
        todos: [],
        totalTodos: 0
    })

    // Form State
    const [formState, formDispatch] = useReducer(formReducer, {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        errors: {}
    })

    // Sample products for shopping cart
    const products = [
        { id: 1, name: 'Laptop', price: 999, image: '💻' },
        { id: 2, name: 'Phone', price: 699, image: '📱' },
        { id: 3, name: 'Headphones', price: 199, image: '🎧' },
        { id: 4, name: 'Mouse', price: 49, image: '🖱️' }
    ]

    // Form validation function
    const validateForm = () => {
        let isValid = true

        if (!formState.name.trim()) {
            formDispatch({ type: 'SET_ERROR', field: 'name', message: 'Name is required' })
            isValid = false
        }

        if (!formState.email.trim()) {
            formDispatch({ type: 'SET_ERROR', field: 'email', message: 'Email is required' })
            isValid = false
        } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
            formDispatch({ type: 'SET_ERROR', field: 'email', message: 'Invalid email format' })
            isValid = false
        }

        if (formState.password.length < 6) {
            formDispatch({ type: 'SET_ERROR', field: 'password', message: 'Password must be at least 6 characters' })
            isValid = false
        }

        if (formState.password !== formState.confirmPassword) {
            formDispatch({ type: 'SET_ERROR', field: 'confirmPassword', message: 'Passwords do not match' })
            isValid = false
        }

        return isValid
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        if (validateForm()) {
            alert('Form submitted successfully!')
            formDispatch({ type: 'RESET_FORM' })
        }
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ textAlign: 'center', color: '#333' }}>useReducer Real-time Examples</h1>

            {/* Shopping Cart Example */}
            <div style={{ marginBottom: '40px', border: '2px solid #007bff', borderRadius: '10px', padding: '20px' }}>
                <h2 style={{ color: '#007bff' }}>🛒 Shopping Cart Example</h2>
                <p><strong>Explanation:</strong> This example shows how useReducer manages complex cart state including adding items, removing items, updating quantities, and calculating totals.</p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    {/* Products Section */}
                    <div>
                        <h3>Available Products:</h3>
                        <div style={{ display: 'grid', gap: '10px' }}>
                            {products.map(product => (
                                <div key={product.id} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span>{product.image} {product.name} - ${product.price}</span>
                                    <button
                                        onClick={() => cartDispatch({ type: 'ADD_ITEM', payload: product })}
                                        style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Cart Section */}
                    <div>
                        <h3>Shopping Cart:</h3>
                        {cartState.items.length === 0 ? (
                            <p style={{ color: '#666' }}>Cart is empty</p>
                        ) : (
                            <div>
                                {cartState.items.map(item => (
                                    <div key={item.id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span>{item.image} {item.name}</span>
                                            <button
                                                onClick={() => cartDispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                                                style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '3px 8px', borderRadius: '3px', cursor: 'pointer' }}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px' }}>
                                            <span>Quantity: {item.quantity}</span>
                                            <div>
                                                <button
                                                    onClick={() => cartDispatch({
                                                        type: 'UPDATE_QUANTITY',
                                                        payload: { id: item.id, quantity: Math.max(0, item.quantity - 1) }
                                                    })}
                                                    style={{ marginRight: '5px', padding: '2px 6px' }}
                                                >
                                                    -
                                                </button>
                                                <button
                                                    onClick={() => cartDispatch({
                                                        type: 'UPDATE_QUANTITY',
                                                        payload: { id: item.id, quantity: item.quantity + 1 }
                                                    })}
                                                    style={{ padding: '2px 6px' }}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right', fontWeight: 'bold' }}>
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                                <div style={{ borderTop: '2px solid #007bff', paddingTop: '10px', marginTop: '10px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                                        <span>Total Items: {cartState.totalItems}</span>
                                        <span>Total Price: ${cartState.totalPrice.toFixed(2)}</span>
                                    </div>
                                    <button
                                        onClick={() => cartDispatch({ type: 'CLEAR_CART' })}
                                        style={{ backgroundColor: '#6c757d', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}
                                    >
                                        Clear Cart
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Todo List Example */}
            <div style={{ marginBottom: '40px', border: '2px solid #28a745', borderRadius: '10px', padding: '20px' }}>
                <h2 style={{ color: '#28a745' }}>📝 Todo List Example</h2>
                <p><strong>Explanation:</strong> This example demonstrates useReducer managing todo items with add, toggle, delete, and edit functionality.</p>

                <div style={{ marginBottom: '20px' }}>
                    <input
                        type="text"
                        placeholder="Enter a new todo..."
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' && e.target.value.trim()) {
                                todoDispatch({ type: 'ADD_TODO', payload: e.target.value.trim() })
                                e.target.value = ''
                            }
                        }}
                        style={{ padding: '8px', width: '300px', marginRight: '10px' }}
                    />
                    <button
                        onClick={() => {
                            const input = document.querySelector('input[placeholder="Enter a new todo..."]')
                            if (input.value.trim()) {
                                todoDispatch({ type: 'ADD_TODO', payload: input.value.trim() })
                                input.value = ''
                            }
                        }}
                        style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '5px', cursor: 'pointer' }}
                    >
                        Add Todo
                    </button>
                </div>

                <div>
                    <h3>Total Todos: {todoState.totalTodos}</h3>
                    {todoState.todos.length === 0 ? (
                        <p style={{ color: '#666' }}>No todos yet. Add one above!</p>
                    ) : (
                        <div style={{ display: 'grid', gap: '10px' }}>
                            {todoState.todos.map(todo => (
                                <div key={todo.id} style={{
                                    border: '1px solid #ddd',
                                    padding: '15px',
                                    borderRadius: '5px',
                                    backgroundColor: todo.completed ? '#f8f9fa' : 'white',
                                    textDecoration: todo.completed ? 'line-through' : 'none'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <span style={{ fontWeight: 'bold' }}>{todo.text}</span>
                                            <div style={{ fontSize: '12px', color: '#666' }}>Created: {todo.createdAt}</div>
                                        </div>
                                        <div>
                                            <button
                                                onClick={() => todoDispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
                                                style={{
                                                    backgroundColor: todo.completed ? '#ffc107' : '#28a745',
                                                    color: 'white',
                                                    border: 'none',
                                                    padding: '5px 10px',
                                                    borderRadius: '3px',
                                                    cursor: 'pointer',
                                                    marginRight: '5px'
                                                }}
                                            >
                                                {todo.completed ? 'Undo' : 'Complete'}
                                            </button>
                                            <button
                                                onClick={() => todoDispatch({ type: 'DELETE_TODO', payload: todo.id })}
                                                style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Form Management Example */}
            <div style={{ border: '2px solid #ffc107', borderRadius: '10px', padding: '20px' }}>
                <h2 style={{ color: '#ffc107' }}>📋 Form Management Example</h2>
                <p><strong>Explanation:</strong> This example shows how useReducer can manage complex form state including field updates, validation errors, and form reset.</p>

                <form onSubmit={handleFormSubmit} style={{ display: 'grid', gap: '15px', maxWidth: '400px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Name:</label>
                        <input
                            type="text"
                            value={formState.name}
                            onChange={(e) => formDispatch({ type: 'UPDATE_FIELD', field: 'name', value: e.target.value })}
                            style={{
                                width: '100%',
                                padding: '8px',
                                border: formState.errors.name ? '2px solid #dc3545' : '1px solid #ddd',
                                borderRadius: '4px'
                            }}
                        />
                        {formState.errors.name && <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>{formState.errors.name}</div>}
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email:</label>
                        <input
                            type="email"
                            value={formState.email}
                            onChange={(e) => formDispatch({ type: 'UPDATE_FIELD', field: 'email', value: e.target.value })}
                            style={{
                                width: '100%',
                                padding: '8px',
                                border: formState.errors.email ? '2px solid #dc3545' : '1px solid #ddd',
                                borderRadius: '4px'
                            }}
                        />
                        {formState.errors.email && <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>{formState.errors.email}</div>}
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Password:</label>
                        <input
                            type="password"
                            value={formState.password}
                            onChange={(e) => formDispatch({ type: 'UPDATE_FIELD', field: 'password', value: e.target.value })}
                            style={{
                                width: '100%',
                                padding: '8px',
                                border: formState.errors.password ? '2px solid #dc3545' : '1px solid #ddd',
                                borderRadius: '4px'
                            }}
                        />
                        {formState.errors.password && <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>{formState.errors.password}</div>}
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Confirm Password:</label>
                        <input
                            type="password"
                            value={formState.confirmPassword}
                            onChange={(e) => formDispatch({ type: 'UPDATE_FIELD', field: 'confirmPassword', value: e.target.value })}
                            style={{
                                width: '100%',
                                padding: '8px',
                                border: formState.errors.confirmPassword ? '2px solid #dc3545' : '1px solid #ddd',
                                borderRadius: '4px'
                            }}
                        />
                        {formState.errors.confirmPassword && <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>{formState.errors.confirmPassword}</div>}
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                            type="submit"
                            style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', flex: 1 }}
                        >
                            Submit
                        </button>
                        <button
                            type="button"
                            onClick={() => formDispatch({ type: 'RESET_FORM' })}
                            style={{ backgroundColor: '#6c757d', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', flex: 1 }}
                        >
                            Reset
                        </button>
                    </div>
                </form>
            </div>

            {/* Key Concepts Explanation */}
            <div style={{ marginTop: '40px', backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '10px' }}>
                <h2 style={{ color: '#333' }}>🔑 Key useReducer Concepts Explained</h2>

                <div style={{ marginBottom: '20px' }}>
                    <h3>1. What is useReducer?</h3>
                    <p>useReducer is a React Hook that manages complex state logic. It's like useState but for more complex state management scenarios.</p>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <h3>2. When to use useReducer?</h3>
                    <ul>
                        <li>When you have complex state logic</li>
                        <li>When state depends on previous state</li>
                        <li>When you need to manage multiple related state values</li>
                        <li>When you want to centralize state logic</li>
                    </ul>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <h3>3. useReducer Structure:</h3>
                    <pre style={{ backgroundColor: '#e9ecef', padding: '10px', borderRadius: '5px', overflow: 'auto' }}>
                        {`const [state, dispatch] = useReducer(reducer, initialState)

// reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'ACTION_TYPE':
      return newState
    default:
      return state
  }
}

// dispatch action
dispatch({ type: 'ACTION_TYPE', payload: data })`}
                    </pre>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <h3>4. Benefits of useReducer:</h3>
                    <ul>
                        <li><strong>Predictable State Updates:</strong> All state changes go through the reducer function</li>
                        <li><strong>Easier Testing:</strong> Reducer functions are pure functions, easy to test</li>
                        <li><strong>Better Debugging:</strong> You can log all actions and state changes</li>
                        <li><strong>Centralized Logic:</strong> All state logic is in one place</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default UseReducer