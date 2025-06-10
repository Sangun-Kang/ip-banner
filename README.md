# ip-banner

A lightweight and extensible JavaScript library for displaying the public IP address in a fixed banner at the top of the browser.

## Installation

```bash
npm install ip-banner
```

## Usage

```html
<script src="https://unpkg.com/ip-banner/dist/ip-banner.min.js"></script>
<script>
  initIPBanner({
    backgroundColor: '#e60012',
    textColor: '#fff',
    iconUrl: 'https://example.com/ip-icon.png',
    description: 'Current IP:',
    height: '3em',
    ipPosition: 'prefix',
    ipSpacing: 12,
    iconSpacing: 10
  });
</script>
```

### Options

| Name            | Type      | Default       | Description                                          |
|-----------------|-----------|---------------|------------------------------------------------------|
| backgroundColor | `string`  | `#003366`     | Banner background color                              |
| textColor       | `string`  | `#ffffff`     | Text color                                           |
| fontFamily      | `string`  | `sans-serif`  | Font family                                          |
| iconUrl         | `string`  | `''`          | URL of the icon to display                           |
| description     | `string`  | `Your public IP:` | Label text                                       |
| height          | `string`  | `2.5em`       | Banner height                                        |
| zIndex          | `number`  | `9999`        | CSS z-index                                          |
| ipPosition      | `string`  | `suffix`      | Placement of the IP relative to the label: `prefix` or `suffix` |
| ipSpacing       | `number`  | `8`           | Spacing (px) between the label and IP                |
| iconSpacing     | `number`  | `8`           | Spacing (px) between the icon and the next element   |

## License

MIT © Your Name
