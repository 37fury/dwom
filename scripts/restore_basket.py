from PIL import Image

def restore_basket():
    base_logo_path = 'public/logo.png'
    orange_logo_path = 'public/logo-orange.png'
    
    img = Image.open(base_logo_path).convert('RGBA')
    orange_ref = Image.open(orange_logo_path).convert('RGBA')
    
    if img.size != orange_ref.size:
        print(f"Resizing orange ref.")
        orange_ref = orange_ref.resize(img.size)

    width, height = img.size
    base_data = img.load()
    
    # DEBUG: Print pixel values
    print(f"Pixel at (50, 150) [Text 'd'?]: {base_data[50, 150]}")
    print(f"Pixel at (500, 150) [Basket?]: {base_data[500, 150]}")
    
    basket_layer = Image.new('RGBA', (width, height), (0,0,0,0))
    basket_data = basket_layer.load()
    
    min_x, max_x = width, 0
    min_y, max_y = height, 0
    
    for x in range(width):
        for y in range(height):
            p = base_data[x, y]
            # Refined filter: Orange has High Red AND High Saturation (Red >> Blue)
            # Text (Grey) has Red ~= Blue
            
            if p[3] > 0:
                pass 
                # Check color difference
                red_blue_diff = p[0] - p[2]
                
                # Basket is orange (R high, B low). Text is grey (R~=B)
                if red_blue_diff > 50: 
                    basket_data[x, y] = p
                    if x < min_x: min_x = x
                    if x > max_x: max_x = x
                    if y < min_y: min_y = y
                    if y > max_y: max_y = y
                
    print(f"Basket Bounds: x={min_x}-{max_x}, y={min_y}-{max_y}")
    
    if min_x > max_x:
        print("Error: No basket pixels found!")
        return

    final_img = orange_ref.copy()
    final_data = final_img.load()
    
    # Clear the vertical strip roughly corresponding to the basket
    # Using the detected bounds
    for x in range(min_x, max_x + 1):
        for y in range(height):
             final_data[x, y] = (0,0,0,0)
             
    final_img.alpha_composite(basket_layer)
    final_img.save('public/logo-orange-restored.png')
    print("Saved public/logo-orange-restored.png")

if __name__ == "__main__":
    restore_basket()
