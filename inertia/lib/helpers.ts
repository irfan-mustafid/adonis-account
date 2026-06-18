import _ from "lodash";
import { message, Modal } from "antd";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import dayOfYear from "dayjs/plugin/dayOfYear";
import { Permission } from "./types/permissions";
import { Menu } from "./models/Menu";

dayjs.extend(dayOfYear);

const random = Math.floor(Math.random() * 1000000);
const dummyName = [
    "Firman Yudas",
    "Eka Putra",
    "Firmansyah",
    "Eko Putra",
    "Ayu Indrawati",
    "Tika Yulinita",
    "Echa Noor",
];
export const faker = {
    company_name: `PT. ${random} Indonesia`,
    company_mail: `company_${random}@yopmail.com`,
    company_phone: `021${random}00`,
    company_postalcode: `${random}00`,
    address: `JL. Raya ${random} Merdeka, No. ${random}`,
    personName: dummyName[Math.floor(Math.random() * dummyName.length)],
};

export const dataTest = (value: string | number | undefined) => {
    const isLocal = window.location.hostname === "localhost";
    if (isLocal && value) {
        navigator.clipboard.writeText(value.toString());
    }
};

export const errorModalMessage = (err: AxiosError) => {
    const statusCode = err.response?.status;
    const response = err.response?.data as {
        message: string;
        errors?: Array<{
            row: number;
            id: number;
            deskripsi: string;
            message: string;
            type: string;
        }>;
        total_errors?: number;
    };
    const { message: messageContent, errors } = response || {};

    if (statusCode === 400) {
        return Modal.error({
            title: " Terjadi Kesalahan",
            content: messageContent,
        });
    }

    if (statusCode === 422) {
        // Jika ada errors array (dari validasi import), tampilkan dengan detail
        if (errors && Array.isArray(errors) && errors.length > 0) {
            // Ambil pesan error pertama saja
            const firstError = errors[0];
            return Modal.error({
                icon: false,
                title: messageContent || "Validasi Gagal",
                content: firstError.message,
            });
        }

        return Modal.error({
            icon: false,
            title: "Mohon Lengkapi Data",
            content: messageContent,
        });
    }

    return Modal.error({
        icon: false,
        title: "Internal Server Error",
        content: messageContent,
    });
};

/**
 * @deprecated Gunakan errorModalMessage sebagai gantinya
 */
export const errorMessage = (err: AxiosError) => {
    const statusCode = err.response?.status;
    const response = err.response?.data;
    const messageContent = (response as { message: string }).message;
    // message.error("Lost Connection");
    if (statusCode === 400) {
        return message.error(messageContent);
    }

    return message.error(messageContent || "Internal Server Error");
    // switch (
    //     statusCode // NOSONAR
    // ) {
    //     case 400:
    //         message.error(messageContent);
    //         break;

    //     default:
    //         message.error(messageContent || "Internal Server Error");
    //         break;
    // }
};

export const baseUrlFile = (path?: string) => {
    return `/file?path=${path}`;
};

export const isObjAnyTrue = (conditions: Record<string, unknown>) => {
    return Object.keys(conditions).some((key) => conditions[key]);
};

export const isObjAllTrue = (conditions: Record<string, unknown>) => {
    return Object.keys(conditions).every((key) => conditions[key]);
};

export const isAnyTrue = (conditions: unknown[]) => {
    return conditions.some((condition) => condition);
};

export const isAllTrue = (conditions: unknown[]) => {
    return conditions.every((condition) => condition);
};

export const getFirstTrue = (
    conditions: { label: boolean; value: boolean }[],
): boolean => {
    const found = conditions.find((condition) => condition.label);
    return found ? found.value : false;
};

export const dateParser = (value: string | undefined) => {
    if (value === undefined || value === null || value === "") {
        return undefined;
    }
    return dayjs(value);
};

export const tglIndo = (value: string | undefined) => {
    if (value === undefined) {
        return "";
    }

    return dayjs(value).format("DD MMMM YYYY");
};

export const tglIndo2 = (value: string | undefined) => {
    if (value === undefined) {
        return "";
    }

    return dayjs(value).format("DD MMM YYYY");
};

export const dateTimeIndo = (value: string | undefined) => {
    if (value === undefined) {
        return "";
    }

    return dayjs(value).format("DD MMMM YYYY HH:mm:ss");
};

export const formatNumber = (value: number | undefined): string => {
    if (Number.isNaN(value)) {
        return "0";
    }

    if (value === undefined) {
        return "0";
    }

    const parts = value.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return parts.join(",");
};

export const isExist = (value: unknown[], cb: () => void) => {
    if (isAnyTrue(value)) {
        cb();
    }
};

/**
 * @deprecated gunakan toNumber bawaan lodash
 */
export const toNumber = (value: string | undefined | number) => {
    const a = _.toNumber(value);
    if (_.isNaN(a)) {
        return 0;
    }

    return a;
};

export const imgBase64 = (base64: string | undefined) => {
    if (base64 === undefined) {
        return undefined;
    }
    return `data:image/jpeg;base64,${base64}`;
};

export const requestDefaultConfig = {
    manual: true,
    onError: (error: any) => {
        errorModalMessage(error);
    },
};

export const isUserAccessible = (
    userRoleMenus: Menu[] | undefined,
    permissionList: Permission[] | undefined,
): boolean => {
    if (userRoleMenus === undefined || permissionList === undefined) {
        return true;
    }

    if (userRoleMenus.length === 0) {
        return true;
    }

    const userPermissions = userRoleMenus?.map((p) => p.name);
    return permissionList?.some((permission) =>
        userPermissions?.includes(permission),
    );
};

/**
 * Konversi angka menjadi terbilang dalam Bahasa Indonesia
 * @param value - Angka yang akan dikonversi (support hingga triliun)
 * @returns String terbilang dalam Bahasa Indonesia
 * @example
 * terbilang(123) // "seratus dua puluh tiga"
 * terbilang(1500000) // "satu juta lima ratus ribu"
 */
export const terbilang = (value: number | string | undefined): string => {
    if (value === undefined || value === null || value === "") {
        return "";
    }

    const angka = typeof value === "string" ? parseInt(value, 10) : value;

    if (Number.isNaN(angka)) {
        return "";
    }

    if (angka === 0) {
        return "nol";
    }

    const angkaStr = [
        "",
        "satu",
        "dua",
        "tiga",
        "empat",
        "lima",
        "enam",
        "tujuh",
        "delapan",
        "sembilan",
        "sepuluh",
        "sebelas",
    ];

    const terbilangRekursif = (num: number): string => {
        if (num < 12) {
            return angkaStr[num];
        }
        if (num < 20) {
            return `${terbilangRekursif(num - 10)} belas`;
        }
        if (num < 100) {
            const puluhan = terbilangRekursif(Math.floor(num / 10));
            const sisa = num % 10;
            return sisa !== 0
                ? `${puluhan} puluh ${terbilangRekursif(sisa)}`
                : `${puluhan} puluh`;
        }
        if (num < 200) {
            const sisa = num % 100;
            return sisa !== 0
                ? `seratus ${terbilangRekursif(sisa)}`
                : "seratus";
        }
        if (num < 1000) {
            const ratusan = terbilangRekursif(Math.floor(num / 100));
            const sisa = num % 100;
            return sisa !== 0
                ? `${ratusan} ratus ${terbilangRekursif(sisa)}`
                : `${ratusan} ratus`;
        }
        if (num < 2000) {
            const sisa = num % 1000;
            return sisa !== 0 ? `seribu ${terbilangRekursif(sisa)}` : "seribu";
        }
        if (num < 1000000) {
            const ribuan = terbilangRekursif(Math.floor(num / 1000));
            const sisa = num % 1000;
            return sisa !== 0
                ? `${ribuan} ribu ${terbilangRekursif(sisa)}`
                : `${ribuan} ribu`;
        }
        if (num < 1000000000) {
            const jutaan = terbilangRekursif(Math.floor(num / 1000000));
            const sisa = num % 1000000;
            return sisa !== 0
                ? `${jutaan} juta ${terbilangRekursif(sisa)}`
                : `${jutaan} juta`;
        }
        if (num < 1000000000000) {
            const miliaran = terbilangRekursif(Math.floor(num / 1000000000));
            const sisa = num % 1000000000;
            return sisa !== 0
                ? `${miliaran} miliar ${terbilangRekursif(sisa)}`
                : `${miliaran} miliar`;
        }
        if (num < 1000000000000000) {
            const triliunan = terbilangRekursif(
                Math.floor(num / 1000000000000),
            );
            const sisa = num % 1000000000000;
            return sisa !== 0
                ? `${triliunan} triliun ${terbilangRekursif(sisa)}`
                : `${triliunan} triliun`;
        }
        return "";
    };

    return `${terbilangRekursif(Math.abs(angka))}`;
};

/**
 * Format tanggal dalam bentuk terbilang lengkap
 * @param value - String tanggal atau Dayjs object
 * @returns String format: "delapan bulan Juli tahun dua ribu dua puluh lima"
 * @example
 * tglTerbilangLengkap("2025-07-08") // "delapan bulan Juli tahun dua ribu dua puluh lima"
 * tglTerbilangLengkap(dayjs()) // "delapan bulan Juli tahun dua ribu dua puluh lima"
 */
export const tglTerbilangLengkap = (
    value: string | dayjs.Dayjs | undefined,
): string => {
    if (value === undefined || value === null || value === "") {
        return "";
    }

    const date = dayjs.isDayjs(value) ? value : dayjs(value);
    const tanggal = date.date();
    const bulan = date.format("MMMM");
    const tahun = date.year();

    return `${terbilang(tanggal)} bulan ${bulan} tahun ${terbilang(tahun)}`;
};
