'use babel'

const dictionaryPattern = /lang\s*=\s*"([^"]*)"/im

export default {
  argumentPattern: null,
  environmentPattern: null,

  provideGrammar () {
    return [{
      grammarScopes: ['text.html.basic'],
      getDictionaries: textEditor => {
        let dictionaries = []
        textEditor.scan(dictionaryPattern, ({match, stop}) => {
          dictionaries = match[1].split(/(?:\s,)+/)
          stop()
        })
        return dictionaries
      },
      ignoredScopes: [
        '.constant.character.entity.html',
        '.constant.other.inline-data.html',
        '.entity.name.tag.block.any.html',
        '.entity.name.tag.doctype.html',
        '.entity.name.tag.inline.any.html',
        '.entity.name.tag.other.html',
        '.entity.name.tag.script.html',
        '.entity.name.tag.structure.any.html',
        '.entity.name.tag.style.html',
        '.entity.name.tag.xml.html',
        '.entity.other.attribute-name.html',
        '.entity.other.attribute-name.id.html',
        '.meta.tag.sgml.doctype.html',
        '.punctuation.definition.entity.html',
        '.punctuation.definition.tag.html',
        '.source.coffee.embedded.html',
        '.source.css.embedded.html',
        '.source.js.embedded.html',
        '.source.python.embedded.html',
        '.source.smarty.embedded.html'
      ]
    }]
  },

  activate () {
    require('atom-package-deps').install('linter-spell-html')
      .then(() => {
        console.log('All dependencies installed, good to go')
      })
  },

  deactivate () {
  }
}
