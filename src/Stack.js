import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    return {
    	[droppableSource.droppableId]: [ ...source ].filter(
    		(item, index) => ( index !== droppableSource.index )
    	),
    	[droppableDestination.droppableId]: [ ...destination, source[droppableSource.index] ],
    };
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',

    // change background colour if dragging
    background: isDragging ? 'inherit' : 'inherit',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
	borderColor: isDraggingOver ? '#222' : '#ddd'
});

class Stack extends Component {
	constructor(props) {
		super(props);
		this.state = {
			items: props.children,
			selected: [],
		}
	}

    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */
    id2List = {
        droppable: 'items',
        droppable2: 'selected'
    };

    getList = id => this.state[this.id2List[id]];

    onDragEnd = result => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            let state = { items };

            if (source.droppableId === 'droppable2') {
                state = { selected: items };
            }

            this.setState(state);
        } else {
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );

            this.setState({
                items: result.droppable,
                selected: result.droppable2
            });
        }
    };

    getItemId(item) {
    	return item.props.user.id;
    }

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        return (
        	<div className="stack">
	            <DragDropContext onDragEnd={this.onDragEnd}>
	                <Droppable droppableId="droppable" direction="horizontal">
	                    {(provided, snapshot) => (
	                        <div
	                            ref={provided.innerRef}
	                            style={getListStyle(snapshot.isDraggingOver)}>
	                            {this.state.items.map((item, index) => (
	                                <Draggable
	                                    key={this.getItemId(item)}
	                                    draggableId={this.getItemId(item)}
	                                    index={index}>
	                                    {(provided, snapshot) => (
	                                        <div
	                                            ref={provided.innerRef}
	                                            {...provided.draggableProps}
	                                            {...provided.dragHandleProps}
	                                            style={getItemStyle(
	                                                snapshot.isDragging,
	                                                provided.draggableProps.style
	                                            )}>
	                                            {item}
	                                        </div>
	                                    )}
	                                </Draggable>
	                            ))}
	                            {provided.placeholder}
	                        </div>
	                    )}
	                </Droppable>
	                <Droppable droppableId="droppable2" direction="horizontal">
	                    {(provided, snapshot) => (
	                        <div
	                            ref={provided.innerRef}
	                            style={getListStyle(snapshot.isDraggingOver)}>
	                            {this.state.selected.map((item, index) => (
	                                <Draggable
	                                    key={this.getItemId(item)}
	                                    draggableId={this.getItemId(item)}
	                                    index={index}>
	                                    {(provided, snapshot) => (
	                                        <div
	                                            ref={provided.innerRef}
	                                            {...provided.draggableProps}
	                                            {...provided.dragHandleProps}
	                                            style={getItemStyle(
	                                                snapshot.isDragging,
	                                                provided.draggableProps.style
	                                            )}>
	                                            {item}
	                                        </div>
	                                    )}
	                                </Draggable>
	                            ))}
	                            {provided.placeholder}
	                        </div>
	                    )}
	                </Droppable>
	            </DragDropContext>
	        </div>
        );
    }
}

export default Stack;
