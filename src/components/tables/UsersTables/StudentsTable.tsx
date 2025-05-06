import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../../ui/table";

import Button from "../../ui/button/Button";
import { PlusIcon, FileIcon, PencilIcon, LockIcon, TrashBinIcon } from "../../../icons";
import { useModal } from "../../../hooks/useModal";
import { Modal } from "../../ui/modal";
import Input from "../../form/input/InputField";
import Label from "../../form/Label";
import Badge from "../../ui/badge/Badge";

interface Order {
    id: number;
    user: {
        image: string;
        name: string;
        role: string;
    };
    projectName: string;
    team: {
        images: string[];
    };
    status: string;
    budget: string;
}

// Define the table data using the interface
const tableData: Order[] = [
    {
        id: 1,
        user: {
            image: "/images/user/user-16.jpg",
            name: "DERBI mohamed-sadik",
            role: "GINF",
        },
        projectName: "2256464",
        team: {
            images: [
                "/images/user/user-22.jpg",
                "/images/user/user-23.jpg",
                "/images/user/user-24.jpg",
            ],
        },
        budget: "3.9K",
        status: "Active",
    },
    {
        id: 2,
        user: {
            image: "/images/user/user-18.jpg",
            name: "Kaiya George",
            role: "IA",
        },
        projectName: "2256468",
        team: {
            images: ["/images/user/user-25.jpg", "/images/user/user-26.jpg"],
        },
        budget: "24.9K",
        status: "Pending",
    },
    {
        id: 3,
        user: {
            image: "/images/user/user-17.jpg",
            name: "Zain Geidt",
            role: "Content Writing",
        },
        projectName: "2256346",
        team: {
            images: ["/images/user/user-27.jpg"],
        },
        budget: "12.7K",
        status: "Active",
    },
    {
        id: 4,
        user: {
            image: "/images/user/user-20.jpg",
            name: "Abram Schleifer",
            role: "Digital Marketer",
        },
        projectName: "Social Media",
        team: {
            images: [
                "/images/user/user-28.jpg",
                "/images/user/user-29.jpg",
                "/images/user/user-30.jpg",
            ],
        },
        budget: "2.8K",
        status: "Cancel",
    },
    {
        id: 5,
        user: {
            image: "/images/user/user-21.jpg",
            name: "Carla George",
            role: "Front-end Developer",
        },
        projectName: "Website",
        team: {
            images: [
                "/images/user/user-31.jpg",
                "/images/user/user-32.jpg",
                "/images/user/user-33.jpg",
            ],
        },
        budget: "4.5K",
        status: "Active",
    },
];

export default function StudentsTable() {

    const { isOpen: isEditModalOpen, openModal: openEditModal, closeModal: closeEditModal } = useModal();
    const { isOpen: isAddModalOpen, openModal: openAddModal, closeModal: closeAddModal } = useModal();

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="flex justify-end p-4 gap-2">
                <Button
                    size="sm"
                    startIcon={<PlusIcon className="size-5" />}
                    onClick={openAddModal}
                >
                    Add New
                </Button>

                <Button
                    size="sm"
                    startIcon={<FileIcon className="size-5" />}
                    onClick={openAddModal}
                >
                    Import
                </Button>
            </div>
            <div className="max-w-full overflow-x-auto">
                <div className="min-w-[1102px] px-2">
                    <Table>
                        {/* Table Header */}
                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                            <TableRow>

                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >Student</TableCell>

                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >Apogee</TableCell>

                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >Status</TableCell>

                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >Actions</TableCell>

                            </TableRow>
                        </TableHeader>

                        {/* Table Body */}
                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {tableData.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 overflow-hidden rounded-full">
                                                <img
                                                    width={40}
                                                    height={40}
                                                    src={order.user.image}
                                                    alt={order.user.name}
                                                />
                                            </div>
                                            <div>
                                                <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                    {order.user.name}
                                                </span>
                                                <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                                                    {order.user.role}
                                                </span>
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {order.projectName}
                                    </TableCell>

                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        <Badge variant="light" color="success">
                                            Active
                                        </Badge>
                                    </TableCell>

                                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                        <div className="flex items-center gap-3">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                startIcon={<PencilIcon className="size-5" />}
                                                onClick={openEditModal}
                                            >Edit</Button>

                                            <Button
                                                size="sm"
                                                variant="outline"
                                                startIcon={<LockIcon className="size-5" />}
                                                onClick={alert}
                                            >Disable</Button>

                                            <Button
                                                size="sm"
                                                variant="outline"
                                                startIcon={<TrashBinIcon className="size-5" />}
                                                onClick={alert}
                                            >Delete</Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Edit Modal */}
                    <Modal isOpen={isEditModalOpen} onClose={closeEditModal} className="max-w-[700px] m-4">
                        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                            <div className="px-2 pr-14">
                                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                                    Edit student profile
                                </h4>
                            </div>
                            <form className="flex flex-col">
                                <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">

                                    <div className="mt-7">
                                        <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                                            Informations personnelles
                                        </h5>
                                        <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                                            <div className="col-span-2 lg:col-span-1">
                                                <Label>Prénom</Label>
                                                <Input
                                                    type="text"
                                                    value="Rida"
                                                    disabled
                                                    className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 cursor-not-allowed"
                                                />
                                            </div>

                                            <div className="col-span-2 lg:col-span-1">
                                                <Label>Nom</Label>
                                                <Input
                                                    type="text"
                                                    value="Mihi"
                                                    disabled
                                                    className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 cursor-not-allowed"
                                                />
                                            </div>

                                            <div className="col-span-2 lg:col-span-1">
                                                <Label>numéro apogée</Label>
                                                <Input
                                                    type="text"
                                                    value="27930"
                                                    disabled
                                                    className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 cursor-not-allowed"
                                                />
                                            </div>

                                            <div className="col-span-2 lg:col-span-1">
                                                <Label>Addresse Email</Label>
                                                <Input
                                                    type="text"
                                                    value="ridamihi12@gmail.com"
                                                    disabled
                                                    className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 cursor-not-allowed"
                                                />
                                            </div>

                                            <div className="col-span-2 lg:col-span-1">
                                                <Label>Téléphone</Label>
                                                <Input type="text" value="+212 633984632" />
                                            </div>


                                        </div>
                                    </div>

                                </div>
                                <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                                    <Button size="sm" variant="outline" onClick={closeEditModal}>
                                        Fermer
                                    </Button>
                                    <Button size="sm" onClick={alert}>
                                        Enregistrer
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </Modal>

                    {/* Add New Modal */}
                    <Modal isOpen={isAddModalOpen} onClose={closeAddModal} className="max-w-[700px] m-4">
                        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                            <div className="px-2 pr-14">
                                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                                    Add New Student
                                </h4>
                            </div>
                            <form className="flex flex-col">
                                <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
                                    <div className="mt-7">
                                        <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                                            Personal Information
                                        </h5>
                                        <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                                            <div className="col-span-2 lg:col-span-1">
                                                <Label>First Name</Label>
                                                <Input type="text" placeholder="Enter first name" />
                                            </div>
                                            <div className="col-span-2 lg:col-span-1">
                                                <Label>Last Name</Label>
                                                <Input type="text" placeholder="Enter last name" />
                                            </div>
                                            <div className="col-span-2 lg:col-span-1">
                                                <Label>Apogee Number</Label>
                                                <Input type="text" placeholder="Enter apogee number" />
                                            </div>
                                            <div className="col-span-2 lg:col-span-1">
                                                <Label>Email Address</Label>
                                                <Input type="email" placeholder="Enter email address" />
                                            </div>
                                            <div className="col-span-2 lg:col-span-1">
                                                <Label>Phone Number</Label>
                                                <Input type="tel" placeholder="Enter phone number" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                                    <Button size="sm" variant="outline" onClick={closeAddModal}>
                                        Cancel
                                    </Button>
                                    <Button size="sm" onClick={() => alert('Student added')}>
                                        Add Student
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </Modal>

                </div>
            </div>
        </div>
    );
}
