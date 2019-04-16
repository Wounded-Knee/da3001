import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const className = 'list';
class List extends Component {
	getClassName() {
		const { children } = this.props;
		const sampleChild = children[0];
		return [
			className,
			'type_' + (sampleChild ? this.getItemType(sampleChild) : 'none'),
			this.props.className,
			this.props.orientation.toLowerCase(),
		].join(' ');
	}

	getItemType(item) {
		return item.type.name.toLowerCase();
	}

	getItemId(item) {
		var returnValue = this.getItemType(item) + '_';
		switch (this.getItemType(item)) {
			case 'user':
				returnValue += item.props.user.id;
			break;
			case 'tag':
				returnValue += item.props.tag.id;
			break;
			default:
				returnValue += '???';
			break;
		}
		return returnValue;
	}

	getListStyle({ isDraggingOver, draggingFromThisWith }) {
		return {
			background: isDraggingOver ? 'gray' : 'inherit',
			border: draggingFromThisWith ? '1px solid black' : 'inherit',
		};
	}

	getItemStyle(isDragging, draggableStyle) {
		return {
			// some basic styles to make the items look a bit nicer
			userSelect: 'none',
			padding: 0,
			margin: `0 0 0 0`,

			// change background colour if dragging
			background: isDragging ? 'inherit' : 'inherit',

			// styles we need to apply on draggables
			...draggableStyle
		};
	}

	getDraggableItem(item, index) {
		const itemId = this.getItemId(item);
		return (
			<Draggable
				key={ itemId }
				draggableId={ itemId }
				index={ index }>
				{(provided, snapshot) => (
					<li
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						style={this.getItemStyle(
							snapshot.isDragging,
							provided.draggableProps.style
						)}>
						{ item }
					</li>
				)}
			</Draggable>
		);
	}

	getItem(item, index) {
		return (
			<li key={ index }>
				{ item }
			</li>
		);
	}

	render() {
		if (this.props.droppableId) {
			return (
				<Droppable droppableId={ this.props.droppableId } direction={ this.props.orientation.toLowerCase() }>
					{(provided, snapshot) => (
						<ul className={ this.getClassName() } ref={ provided.innerRef } style={ this.getListStyle(snapshot.isDraggingOver) }>
							{ provided.placeholder }
							{
								this.props.children ?
									this.props.draggable ?
										this.props.children.map(this.getDraggableItem.bind(this))
									:
										this.props.children.map(this.getItem.bind(this))
								: ''
							}
						</ul>
					)}
				</Droppable>
			);
		} else {
			return (
				<ul className={ this.getClassName() }>
					{
						this.props.children ?
							this.props.children.map(this.getItem.bind(this))
						: ''
					}
				</ul>
			);
		}
	}
}

export default List;