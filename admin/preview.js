let PostPreview = createClass({
  render: function () {
    let entry = this.props.entry;
    return h(
      "div",
      { className: "preview-body" },
      h("header", {}, [
        h("h1", {}, entry.getIn(["data", "title"])),
        h("div", { className: "post-meta" }, [
          //   h("div", { className: "date" }, [
          //     h("span", { className: "posted-on" }, [
          //       h("i", { className: "fa fa-calendar" }),
          //       h("time", {}, entry.getIn(["data", "date"]) || []),
          //     ]),
          //     h("span", { className: "reading-time" }, [
          //       h("i", { className: "fa fa-clock" }),
          //       h("span", {}, "阅读时间：XX 分钟"),
          //     ]),
          //   ]),
          //   h("div", { className: "tags" }, [
          //     h("i", { className: "fa fa-tag" }),
          //     h("span", { className: "tag" }, [
          //       h("a", {}, entry.getIn(["data", "tags"]) || []),
          //     ]),
          //   ]),
        ]),
      ]),
      h("div", { className: "text" }, this.props.widgetFor("body"))
    );
  },
});
NetlifyCms.registerPreviewTemplate("posts", PostPreview);

NetlifyCms.registerEditorComponent({
  // Internal id of the component
  id: "wiki-image",
  // Visible label
  label: "图片",
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    {
      name: "url",
      label: "图片地址",
      widget: "string",
    },
  ],
  // Regex pattern used to search for instances of this block in the markdown document.
  // Patterns are run in a multline environment (against the entire markdown document),
  // and so generally should make use of the multiline flag (`m`). If you need to capture
  // newlines in your capturing groups, you can either use something like
  // `([\S\s]*)`, or you can additionally enable the "dot all" flag (`s`),
  // which will cause `(.*)` to match newlines as well.
  //
  // Additionally, it's recommended that you use non-greedy capturing groups (e.g.
  // `(.*?)` vs `(.*)`), especially if matching against newline characters.
  pattern:
    /^<div class="wiki-image">$\s*?<picture>$\s*?<source(.*?)?srcset="(.*?)">$\s*?<img src="(.*?)"(.*?)?>$\s*?<\/picture>$\s*?<\/div>$/m,
  // Given a RegExp Match object
  // (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match#return_value),
  // return an object with one property for each field defined in `fields`.
  //
  // This is used to populate the custom widget in the markdown editor in the CMS.
  fromBlock: function (match) {
    return {
      url: match[3],
    };
  },
  // Given an object with one property for each field defined in `fields`,
  // return the string you wish to be inserted into your markdown.
  //
  // This is used to serialize the data from the custom widget to the
  // markdown document
  toBlock: function (data) {
    return `
<div class="wiki-image">
  <picture>
    <source type="image/webp" srcset="${data.url}/normal.webp">
    <img src="${data.url}"/>
  </picture>
</div>
`;
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function (data) {
    return `
<div class="wiki-image">
  <picture>
    <source type="image/webp" srcset="${data.url}/normal.webp">
    <img src="${data.url}"/>
  </picture>
</div>
`;
  },
});
