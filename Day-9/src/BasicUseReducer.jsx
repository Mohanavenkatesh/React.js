import React, { useReducer } from 'react'

// Simple counter reducer
const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 }
    case 'DECREMENT':
      return { count: state.count - 1 }
    case 'RESET':
      return { count: 0 }
    case 'SET_VALUE':
      return { count: action.payload }
    default:
      return state
  }
}

// Theme reducer
const themeReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return { 
        isDark: !state.isDark,
        theme: state.isDark ? 'light' : 'dark'
      }
    case 'SET_THEME':
      return { 
        isDark: action.payload === 'dark',
        theme: action.payload
      }
    default:
      return state
  }
}

const BasicUseReducer = () => {
  // Counter state
  const [counterState, counterDispatch] = useReducer(counterReducer, { count: 0 })
  
  // Theme state
  const [themeState, themeDispatch] = useReducer(themeReducer, { 
    isDark: false, 
    theme: 'light' 
  })

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: themeState.isDark ? '#333' : '#fff',
      color: themeState.isDark ? '#fff' : '#333',
      minHeight: '100vh'
    }}>
      <h1 style={{ textAlign: 'center' }}>Basic useReducer Examples</h1>
      
      {/* Counter Example */}
      <div style={{ 
        border: '2px solid #007bff', 
        borderRadius: '10px', 
        padding: '20px', 
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#007bff' }}>🔢 Counter Example</h2>
        <p><strong>Explanation:</strong> This is the simplest useReducer example - managing a counter with increment, decrement, reset, and set value actions.</p>
        
        <div style={{ fontSize: '48px', fontWeight: 'bold', margin: '20px 0' }}>
          {counterState.count}
        </div>
        
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            onClick={() => counterDispatch({ type: 'DECREMENT' })}
            style={{ 
              backgroundColor: '#dc3545', 
              color: 'white', 
              border: 'none', 
              padding: '10px 20px', 
              borderRadius: '5px', 
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Decrease (-)
          </button>
          
          <button 
            onClick={() => counterDispatch({ type: 'INCREMENT' })}
            style={{ 
              backgroundColor: '#28a745', 
              color: 'white', 
              border: 'none', 
              padding: '10px 20px', 
              borderRadius: '5px', 
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Increase (+)
          </button>
          
          <button 
            onClick={() => counterDispatch({ type: 'RESET' })}
            style={{ 
              backgroundColor: '#6c757d', 
              color: 'white', 
              border: 'none', 
              padding: '10px 20px', 
              borderRadius: '5px', 
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Reset
          </button>
          
          <button 
            onClick={() => counterDispatch({ type: 'SET_VALUE', payload: 100 })}
            style={{ 
              backgroundColor: '#ffc107', 
              color: 'black', 
              border: 'none', 
              padding: '10px 20px', 
              borderRadius: '5px', 
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Set to 100
          </button>
        </div>
        
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
          <h4>How it works:</h4>
          <ul style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
            <li><strong>INCREMENT:</strong> Adds 1 to the current count</li>
            <li><strong>DECREMENT:</strong> Subtracts 1 from the current count</li>
            <li><strong>RESET:</strong> Sets count back to 0</li>
            <li><strong>SET_VALUE:</strong> Sets count to a specific value (payload)</li>
          </ul>
        </div>
      </div>

      {/* Theme Example */}
      <div style={{ 
        border: '2px solid #28a745', 
        borderRadius: '10px', 
        padding: '20px',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#28a745' }}>🎨 Theme Toggle Example</h2>
        <p><strong>Explanation:</strong> This example shows how useReducer can manage theme state with toggle and set theme actions.</p>
        
        <div style={{ 
          padding: '20px', 
          border: '2px dashed #28a745', 
          borderRadius: '10px', 
          margin: '20px 0',
          backgroundColor: themeState.isDark ? '#555' : '#f8f9fa'
        }}>
          <h3>Current Theme: {themeState.theme.toUpperCase()}</h3>
          <p>This box changes color based on the theme!</p>
        </div>
        
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            onClick={() => themeDispatch({ type: 'TOGGLE_THEME' })}
            style={{ 
              backgroundColor: '#28a745', 
              color: 'white', 
              border: 'none', 
              padding: '10px 20px', 
              borderRadius: '5px', 
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Toggle Theme
          </button>
          
          <button 
            onClick={() => themeDispatch({ type: 'SET_THEME', payload: 'light' })}
            style={{ 
              backgroundColor: '#ffc107', 
              color: 'black', 
              border: 'none', 
              padding: '10px 20px', 
              borderRadius: '5px', 
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Light Theme
          </button>
          
          <button 
            onClick={() => themeDispatch({ type: 'SET_THEME', payload: 'dark' })}
            style={{ 
              backgroundColor: '#343a40', 
              color: 'white', 
              border: 'none', 
              padding: '10px 20px', 
              borderRadius: '5px', 
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Dark Theme
          </button>
        </div>
        
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
          <h4>How it works:</h4>
          <ul style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
            <li><strong>TOGGLE_THEME:</strong> Switches between light and dark themes</li>
            <li><strong>SET_THEME:</strong> Sets theme to a specific value (payload)</li>
            <li>The entire page background and text colors change based on theme state</li>
          </ul>
        </div>
      </div>

      {/* Code Explanation */}
      <div style={{ 
        marginTop: '40px', 
        backgroundColor: '#f8f9fa', 
        padding: '20px', 
        borderRadius: '10px',
        border: '2px solid #6c757d'
      }}>
        <h2 style={{ color: '#6c757d' }}>📚 Code Structure Explanation</h2>
        
        <div style={{ marginBottom: '20px' }}>
          <h3>1. Reducer Function Structure:</h3>
          <pre style={{ 
            backgroundColor: '#e9ecef', 
            padding: '15px', 
            borderRadius: '5px', 
            overflow: 'auto',
            fontSize: '14px'
          }}>
{`const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 }
    case 'DECREMENT':
      return { count: state.count - 1 }
    case 'RESET':
      return { count: 0 }
    case 'SET_VALUE':
      return { count: action.payload }
    default:
      return state
  }
}`}
          </pre>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>2. useReducer Hook:</h3>
          <pre style={{ 
            backgroundColor: '#e9ecef', 
            padding: '15px', 
            borderRadius: '5px', 
            overflow: 'auto',
            fontSize: '14px'
          }}>
{`const [state, dispatch] = useReducer(reducer, initialState)

// Example:
const [counterState, counterDispatch] = useReducer(counterReducer, { count: 0 })`}
          </pre>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>3. Dispatching Actions:</h3>
          <pre style={{ 
            backgroundColor: '#e9ecef', 
            padding: '15px', 
            borderRadius: '5px', 
            overflow: 'auto',
            fontSize: '14px'
          }}>
{`// Simple action
dispatch({ type: 'INCREMENT' })

// Action with payload
dispatch({ type: 'SET_VALUE', payload: 100 })

// Action with multiple payload properties
dispatch({ type: 'SET_THEME', payload: 'dark' })`}
          </pre>
        </div>

        <div>
          <h3>4. Key Points:</h3>
          <ul>
            <li><strong>State:</strong> The current state object</li>
            <li><strong>Action:</strong> An object with a 'type' property (and optional 'payload')</li>
            <li><strong>Reducer:</strong> A pure function that takes state and action, returns new state</li>
            <li><strong>Dispatch:</strong> Function to send actions to the reducer</li>
            <li><strong>Initial State:</strong> The starting state when component mounts</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default BasicUseReducer 