
public class AVLTree implements AVLInterface{
	private NodeInterface root;
	private boolean increase;
	private boolean decrease;
	private boolean addReturn;
	private boolean removeReturn;

	public NodeInterface getRootNode() {
		return this.root;
	}

	public boolean add(String toAdd) {
		increase = false;
//		System.out.println("Trying to add "+toAdd);
		root = addItem(root, toAdd);
		return addReturn;
	}
	
	public NodeInterface addItem(NodeInterface node, String toAdd){
		if (node == null){
			addReturn = true;
			increase = true;
			return new Node(toAdd);
		} else if (toAdd.compareTo(node.getData()) == 0){
			addReturn = false;
			increase = false;
			return node;
		} else if (toAdd.compareTo(node.getData()) < 0){
			node.setLeftChild(addItem(node.getLeftChild(), toAdd));
			
			if (increase){
				decrementBalance(node);
				if (node.getBalance() < -1){
					increase = false;
					return rebalanceLeft(node);
				}
			}
			return node;
		} else {
			node.setRightChild(addItem(node.getRightChild(), toAdd));
			if (increase){
				incrementBalance(node);
				if (node.getBalance() > 1){
					increase = false;
					return rebalanceRight(node);
				} else {
					return node;
				}
			} else {
				return node;
			}
		}
	}

	private NodeInterface rebalanceRight(NodeInterface node) {
//		System.out.println("Got to Rebalance Right");
		NodeInterface rightChild = node.getRightChild();
		if (rightChild.getBalance() < 0){
			NodeInterface rightLeftChild = rightChild.getLeftChild();
			if (rightLeftChild.getBalance() > 0){
				rightChild.setBalance(1);
				rightLeftChild.setBalance(0);
				node.setBalance(0);
			} else if (rightLeftChild.getBalance() < 0){
				rightChild.setBalance(0);
				rightLeftChild.setBalance(0);
				node.setBalance(-1);
			} else {
				rightChild.setBalance(0);
				node.setBalance(0);
			}
			node.setRightChild(rotateRight(rightChild));
		} else {
			rightChild.setBalance(0);
			node.setBalance(0);
		}
		return rotateLeft(node);
	}
	
	private NodeInterface rebalanceRightRemove(NodeInterface node) {
		System.out.println("Got to Rebalance Right Remove");
		NodeInterface rightChild = node.getRightChild();
		if (rightChild.getBalance() < 0){
			NodeInterface rightLeftChild = rightChild.getLeftChild();
			if (rightLeftChild.getBalance() > 0){
				rightChild.setBalance(1);
				rightLeftChild.setBalance(0);
				node.setBalance(0);
			} else if (rightLeftChild.getBalance() < 0){
				rightChild.setBalance(0);
				rightLeftChild.setBalance(0);
				node.setBalance(-1);
			} else {
				rightChild.setBalance(0);
				node.setBalance(0);
			}
			increase = false;
			decrease = true;
			node.setRightChild(rotateRight(rightChild));
			return rotateLeft(node);
		} 
		if (rightChild.getBalance() > 0){
			rightChild.setBalance(0);
			node.setBalance(0);
			increase = false;
			decrease = true;
		} else {
			rightChild.setBalance(-1);
			node.setBalance(1);
		}
		return rotateLeft(node);
	}

	private NodeInterface rebalanceLeft(NodeInterface node) {
		NodeInterface leftChild = node.getLeftChild();
		if (leftChild.getBalance() > 0){
			NodeInterface leftRightChild = leftChild.getRightChild();
			if (leftRightChild.getBalance() < 0){
				leftChild.setBalance(-1);
				leftRightChild.setBalance(0);
				node.setBalance(0);
			} else if (leftRightChild.getBalance() > 0){
				leftChild.setBalance(0);
				leftRightChild.setBalance(0);
				node.setBalance(1);
			} else {
				leftChild.setBalance(0);
				node.setBalance(0);
			}
			node.setLeftChild(rotateLeft(leftChild));
		} else {
			leftChild.setBalance(0);
			node.setBalance(0);
		}
		return rotateRight(node);
	}
	
	private NodeInterface rebalanceLeftRemove(NodeInterface node) {
		System.out.println("Got to Rebalance Left Remove");
		NodeInterface leftChild = node.getLeftChild();
		if (leftChild.getBalance() > 0){
			NodeInterface leftRightChild = leftChild.getRightChild();
			if (leftRightChild.getBalance() < 0){
				leftChild.setBalance(-1);
				leftRightChild.setBalance(0);
				node.setBalance(0);
			} else if (leftRightChild.getBalance() > 0){
				leftChild.setBalance(0);
				leftRightChild.setBalance(0);
				node.setBalance(1);
			} else {
				leftChild.setBalance(0);
				node.setBalance(0);
			}
			increase = false;
			decrease = true;
			node.setLeftChild(rotateLeft(leftChild));
			return rotateRight(node);
		}
		if (leftChild.getBalance() < 0){
			leftChild.setBalance(0);
			node.setBalance(0);
			increase = false;
			decrease = true;
		} else {
			leftChild.setBalance(1);
			node.setBalance(-1);
		}
		return rotateRight(node);
	}

	public boolean remove(String toRemove) {
		decrease = false;
		boolean rootChange = false;
		if (root != null){
			if (root.getData().compareTo(toRemove) == 0){
				rootChange = true;
			}
		}
		NodeInterface temp = removeItem(root, toRemove);
		if (rootChange && temp != null){
			temp.setLeftChild(root.getLeftChild());
			temp.setRightChild(root.getRightChild());
		}
		root = temp;
		return removeReturn;
	}
	
	private NodeInterface removeItem(NodeInterface node, String toRemove) {
		if (node == null){
			removeReturn = false;
			return node;
		}
		if (toRemove.compareTo(node.getData()) == 0){
			decrease = true;
			removeReturn = true;
			return findReplacementNode(node);
		} else if (toRemove.compareTo(node.getData()) < 0){
			node.setLeftChild(removeItem(node.getLeftChild(), toRemove));
			if (decrease){
				incrementBalance(node);
				if (node.getBalance() > 1){
					decrease = false;
					return rebalanceRightRemove(node);
				} else {
					return node;
				}
			} else {
				return node;
			}
		} else {
			node.setRightChild(removeItem(node.getRightChild(), toRemove));
			if (decrease){
				decrementBalance(node);
				if (node.getBalance() < -1){
					decrease = false;
					return rebalanceLeftRemove(node);
				} else {
					return node;
				}
			} else {
				return node;
			}
		}
	}

	private NodeInterface findReplacementNode(NodeInterface node) {
		if (node.getLeftChild() == null && node.getRightChild() == null){
			decrease = true;
			return null;
		}
		if (node.getLeftChild() == null){
			decrease = true;
			return node.getRightChild();
		} else if (node.getRightChild() == null){
			decrease = true;
			return node.getLeftChild();
		} else {
			decrease = true;
			return findInOrderPredecessor(node.getLeftChild());
		}
	}

	private NodeInterface findInOrderPredecessor(NodeInterface node) {
		if (node.getRightChild() == null){
			return node;
		} else if (node.getRightChild() != null && node.getRightChild().getRightChild() != null){
			return findInOrderPredecessor(node.getRightChild());
		} else{
			if (node.getRightChild().getLeftChild() != null){
				NodeInterface temp = node.getRightChild();
				node.setRightChild(node.getRightChild().getLeftChild());
				return temp;
			} else {
				NodeInterface temp = node.getRightChild();
				node.setRightChild(null);
				return temp;
			}
		}
	}

	private NodeInterface rotateRight(NodeInterface node){
		NodeInterface temp = node.getLeftChild();
		node.setLeftChild(temp.getRightChild());
		temp.setRightChild(node);
		return temp;
	}
	
	private NodeInterface rotateLeft(NodeInterface node){
		NodeInterface temp = node.getRightChild();
		node.setRightChild(temp.getLeftChild());
		temp.setLeftChild(node);
		return temp;
	}
	
	private void decrementBalance(NodeInterface node){
		node.decrementBalance();
		if (node.getBalance() == 0){
			increase = false;
			decrease = false;
		}
	}
	
	private void incrementBalance(NodeInterface node){
		node.incrementBalance();
		if (node.getBalance() == 0){
			increase = false;
			decrease = false;
		}
	}

}
