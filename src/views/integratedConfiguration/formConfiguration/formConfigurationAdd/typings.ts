export enum ACTION_TYPE {
    SET_BASIC_OPTIONS = 'set_basic_options',
    SET_FORM_PROPS = 'set_form_props',
    ADD_FORM_PROPS_INDEX = 'add_form_props_index',
    SET_FORM_PROPS_INDEX = 'set_form_props_index',
    DELETE_FORM_PROP = 'delete_form_prop',
    CHANGE_MODE = 'change_mode'
}

export enum MODE_TYPE {
    CREATE = 0,
    EDIT = 1
}

export enum INPUT_TYPE {
    INPUT = 'input',
    SELECT = 'select',
    UPLOAD = 'upload',
    CHECK = 'check'
}