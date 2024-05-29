document.addEventListener("DOMContentLoaded", () => {
    const blocks = document.querySelectorAll('.block');
    const textContainer = document.getElementById('text-container');
    const textField = document.getElementById('text-field');
    const container = document.getElementById('container');
    const grid = document.getElementById('grid');
    let activeBlock = null;

    blocks.forEach(block => {
        block.addEventListener('click', (event) => {
            event.stopPropagation(); // Stop click event from propagating to the container
            // Set the text field content based on the clicked block
            textField.value = block.getAttribute('data-text');
            
            // Move the text container to the left center of the container
            textContainer.style.left = '0';

            // Move the clicked block to the original position of the text container
            block.style.position = 'absolute';
            block.style.left = '0';
            block.style.top = '50%';
            block.style.transform = 'translateY(-50%)';
            block.style.width = '20%';
            block.style.height = 'auto';
            block.style.zIndex = '10';

            // Mark the block as active
            activeBlock = block;

            // Adjust the grid layout and other blocks
            grid.style.gridTemplateRows = '1fr';
            grid.style.gridTemplateColumns = 'repeat(6, 1fr)';
            blocks.forEach(otherBlock => {
                if (otherBlock !== block) {
                    otherBlock.style.width = '15%';
                    otherBlock.style.height = 'auto';
                    otherBlock.style.transform = 'translateY(0)';
                }
            });
        });
    });

    // Close the text field when clicking outside of blocks or the text field
    container.addEventListener('click', () => {
        textContainer.style.left = '-100%';
        blocks.forEach(block => {
            block.style.position = '';
            block.style.left = '';
            block.style.top = '';
            block.style.transform = '';
            block.style.width = '';
            block.style.height = '';
            block.style.zIndex = '';

            // Save the text from the text field to the block's data-text attribute
            if (block === activeBlock) {
                block.setAttribute('data-text', textField.value);
            }
        });
        activeBlock = null;

        // Reset the grid layout
        grid.style.gridTemplateRows = 'repeat(2, 1fr)';
        grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
    });
});
