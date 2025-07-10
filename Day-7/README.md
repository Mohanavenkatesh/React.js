# useCallback Hook Example

## What is useCallback?

`useCallback` is a React hook that memoizes a function, preventing it from being recreated on every render unless its dependencies change. This is useful for optimizing performance, especially when passing callbacks to child components that are wrapped in `React.memo`.

## Why use useCallback?

1. **Prevents unnecessary re-renders** of child components
2. **Optimizes performance** by avoiding function recreation
3. **Stable function references** for dependency arrays in other hooks

## Key Concepts Demonstrated

### 1. Function Memoization
```javascript
// Without useCallback - recreated every render
const incrementWithoutCallback = () => {
  setCount(prev => prev + 1)
}

// With useCallback - only recreated when dependencies change
const incrementWithCallback = useCallback(() => {
  setCount(prev => prev + 1)
}, []) // Empty dependency array
```

### 2. React.memo with Callbacks
```javascript
const Button = React.memo(({ onClick, children }) => {
  console.log(`${children} button rendered!`)
  return <button onClick={onClick}>{children}</button>
})
```

### 3. Performance Optimization
- Child components only re-render when their props actually change
- Functions wrapped in `useCallback` maintain the same reference between renders
- Console logs show which components are re-rendering

## How to Test the Example

1. Open the browser console to see re-render logs
2. Click "Increment Other" - only "Other State Display" re-renders
3. Click "Increment Counter" - only "Counter Display" re-renders
4. Notice that buttons with `useCallback` don't re-render unnecessarily

## When to Use useCallback

- ✅ Passing callbacks to `React.memo` components
- ✅ Functions used in `useEffect` dependency arrays
- ✅ Expensive calculations that depend on specific values
- ❌ Simple functions that don't cause performance issues
- ❌ Functions that change frequently anyway

## Dependencies Array

```javascript
// No dependencies - function never changes
const stableFunction = useCallback(() => {
  // do something
}, [])

// With dependencies - function changes when deps change
const dependentFunction = useCallback(() => {
  setCount(count + 1)
}, [count]) // Recreates when count changes
```

## Best Practices

1. **Only use when needed** - don't over-optimize
2. **Include all dependencies** - missing deps can cause bugs
3. **Use with React.memo** - for maximum performance benefit
4. **Consider the trade-off** - useCallback itself has a small cost

This example demonstrates a real-world scenario where `useCallback` prevents unnecessary re-renders and improves application performance.
