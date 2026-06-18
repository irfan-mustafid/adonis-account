const validate = {
    required: (label: string) => ({
        required: true,
        message: `${label} tidak boleh kosong`,
    }),
    condition: (condition: (_value: unknown) => boolean, message: string) => {
        return {
            validator: (_: unknown, value: unknown) => {
                if (!value) {
                    return Promise.resolve();
                }

                if (!condition(value)) {
                    return Promise.resolve();
                }
                return Promise.reject(new Error(message));
            },
        };
    },
};
export default validate;
