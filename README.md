On this react project user adds books (which one wants to read) to the list. These listed cards can be deleted or edited.

UPDATING THE STATE:

If we want to updeate some state in component, we should rerender this component and all that component's children.

How?

Find all the components that need to use this state.
Define the state in the lowest common parent.

In case of BOOKS piece of state the lowest common parent component is App.

EVENT HANDLERS:

createBook
editBook
deleteBook#   b o o k s  
 