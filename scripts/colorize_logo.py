from PIL import Image
import sys

def colorize_logo(input_path, output_path, color):
    try:
        img = Image.open(input_path)
        img = img.convert("RGBA")
        datas = img.getdata()

        new_data = []
        for item in datas:
            # If the pixel is not transparent
            if item[3] > 0:
                # Replace with the new color, keeping the original alpha
                new_data.append((color[0], color[1], color[2], item[3]))
            else:
                new_data.append(item)

        img.putdata(new_data)
        img.save(output_path, "PNG")
        print(f"Successfully processed {input_path} -> {output_path}")
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    # Orange color: #FF6B00 -> (255, 107, 0)
    # The user asked for "completely orange", so we apply this to everything.
    colorize_logo("public/logo.png", "public/logo-orange.png", (255, 107, 0))
