export default function setMetaTag(attr, value) {
    document.querySelector(`meta[${attr}]`).setAttribute("content", value);
}
