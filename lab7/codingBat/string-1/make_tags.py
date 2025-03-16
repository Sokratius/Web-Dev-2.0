def make_tags(tag, word):
    result = "<{}>{}</{}>".format(tag, word, tag)
    return result