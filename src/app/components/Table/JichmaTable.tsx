"use client";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { CSVLink } from "react-csv";
import { BsArrowDownUp } from "react-icons/bs";
import moment from "moment";
import { JichmaList } from "@/types/jichma-types";
import { useJichmaStore } from "@/store/useJichma";
import { useUserStore } from '@/store/userStore';
import { Roles } from '@/helpers/Roles';
import { FaPlus } from "react-icons/fa6";

interface JichmaListProps {
  data: JichmaList[];
  itemsPerPage: number;
}

const JichmaTable: React.FC<JichmaListProps> = ({data}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [nameSearchTerm, setNameSearchTerm] = useState<string>("");
  const [roleSearchTerm, setRoleSearchTerm] = useState<string>("");
  const { deleteJichmaById } = useJichmaStore();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const { user } = useUserStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);
  const [itemIdToUpdate, setItemIdToUpdate] = useState(null);
  const { jichmas } = useJichmaStore();
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const [formData, setFormData] = useState({
        name: '',
        lga: '',
        ward: '',
        gender: '',
        marital_status: '',
        settlement: '',
        phone_number: '',
        facility: '',
        nin: '',
        date: ''  ,
        confirm:true,
  });

  const handleNameSearch = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setNameSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleRoleSearch = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setRoleSearchTerm(event.target.value);
    setCurrentPage(1);
  };
// Handle delete operation
const handleDeleteClick = (id:any) => {
  setItemIdToDelete(id);
  setIsModalVisible(true);
};

const handleConfirmDelete = async () => {
  try {
    if (itemIdToDelete) {
      // Call the store to delete the item
      await useJichmaStore.getState().deleteJichmaById(itemIdToDelete);

      console.log(`Item with id ${itemIdToDelete} deleted`);
    }
  } catch (error) {
    console.error("Failed to delete item:", error);
  } finally {
    setIsModalVisible(false);
    setItemIdToDelete(null);
  }
};

const handleCancelDelete = () => {
  setIsModalVisible(false);
  setItemIdToDelete(null);
};

//update implementations
const handleUpdateClick = (id:any) => {
  const selectedItem =  jichmas.find((item:  JichmaList) => item.id === id);
  if (selectedItem) {
    
    setFormData({
      name: selectedItem.name,
        lga: selectedItem.lga,
        ward: selectedItem.ward,
        gender: selectedItem.gender,
        marital_status: selectedItem.marital_status,
        settlement: selectedItem.settlement,
        phone_number: selectedItem.phone_number,
        facility: selectedItem.facility,
        nin: selectedItem.nin,
        date: selectedItem.date,
        confirm:true,
    });
    
    setItemIdToUpdate(id);
    setIsUpdateModalVisible(true);
  }
};

const handleConfirmUpdate = async () => {
  try {
    if (itemIdToUpdate) {
      const updatedFormData = {
        ...formData,
      
      };
      // Get the updateAgricById function from the store
      const { updateJichmaById } = useJichmaStore.getState();
      // Perform the update operation with the updated form data
      await updateJichmaById(itemIdToUpdate, updatedFormData);
      console.log(`Item with id ${itemIdToUpdate} updated successfully`);
    }
  } catch (error) {
    console.error('Failed to update item:', error);
  } finally {
    setIsUpdateModalVisible(false);
    setItemIdToUpdate(null);
  }
};

const handleCancelUpdate = () => {
  setIsUpdateModalVisible(false);
  setItemIdToUpdate(null);
};

  function hasId(row: JichmaList): row is JichmaList & { id: number } {
    return row.id !== undefined;
  }

  // Filter data based on name search term
const filteredData = nameSearchTerm
? data.filter((row) =>
  row.nin.toLowerCase().includes(nameSearchTerm.toLowerCase()) ||
row.name.toLowerCase().includes(nameSearchTerm.toLowerCase()) ||
row.lga.toLowerCase().includes(nameSearchTerm.toLowerCase())

  )
: data;
const itemsPerPage = 3;
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  // Prepare CSV data based on selected items
  const getCsvData = () => {
    if (selectedItems.length === 0) {
      // Download all items
      return filteredData.map((row) => ({
        name: row.name,
        lga: row.lga,
        ward: row.ward,
        gender: row.gender,
        marital_status: row.marital_status,
        settlement: row.settlement,
        phone_number: row.phone_number,
        facility: row.facility,
        nin: row.nin,
        date: row.date,
      }));
    } else {
      return filteredData
        .filter((row) => hasId(row) && selectedItems.includes(row.id))
        .map((row) => ({
            name: row.name,
            lga: row.lga,
            ward: row.ward,
            gender: row.gender,
            marital_status: row.marital_status,
            settlement: row.settlement,
            phone_number: row.phone_number,
            facility: row.facility,
            nin: row.nin,
            date: row.date,
        }));
    }
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    }
  };

  return (
    <table className=" overflow-x-auto ml-6">
      {/* Search bars */}
      <div className="flex space-x-4 mb-4">
        {/* Search by Name with icon */}
        <div className="relative flex items-center">
          <AiOutlineSearch className="absolute left-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search by Name"
            value={nameSearchTerm}
            onChange={handleNameSearch}
            className="px-4 py-2 border pl-10 rounded-lg" // Adjusted left padding for the icon
          />
        </div>
        {/* Filter by Role with icon */}
        <div className="relative flex items-center">
          <CSVLink
            data={getCsvData()} // Use getCsvData to determine data based on selection
            filename="jICHMA.csv"
            className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-[#5BCAA2] focus:outline-none focus:shadow-outline-blue"
          >
            Download
          </CSVLink>
        </div>
        <div className="relative flex items-center">
          <a href="/others/jichma/Beneficiary/AddNew" className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-[#5BCAA2] focus:outline-none focus:shadow-outline-blue flex items-center space-x-2">
            <FaPlus />
            <span>Add New</span>
          </a>
        </div>
      </div>

      <div className="min-w-full divide-y divide-gray-200 small-table">
        <thead>
          <tr className="bg-green-700">
            <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider">
              <BsArrowDownUp className="w-4 h-4" />
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              NAME
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider">
              LGA
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
             WARD
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
             GENDER
            </th>

            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
             MARRITAL STATUS
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
             SETTLEMENT
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
             PHONE NUMBER
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
             FACILITY
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
             NIN
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              CATEGORY
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
             DATE
            </th>
            {user?.role === Roles.admin && (
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Actions
            </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentItems &&
            currentItems.map((row, index) => (
              <tr key={index}>
                {/* Checkbox for selecting the record */}
                <td className="px-6 py-4 whitespace-wrap">
                  <input
                    type="checkbox"
                    checked={hasId(row) && selectedItems.includes(row.id)} // Use type guard
                    onChange={(event) =>
                      handleCheckboxChange(event, hasId(row) ? row.id : 0)
                    } // Handle potential undefined id
                    className="w-6 h-6"
                  />
                </td>
                <td className="px-6 py-4 whitespace-wrap">{row.name}</td>
                <td className="px-6 py-4 whitespace-wrap">{row.lga}</td>
                <td className="px-6 py-4 whitespace-wrap">{row.ward}</td>
                <td className="px-6 py-4 whitespace-wrap">{row.gender}</td>
                <td className="px-6 py-4 whitespace-wrap">{row.marital_status}</td>
                <td className="px-6 py-4 whitespace-wrap">{row.settlement}</td>
                <td className="px-6 py-4 whitespace-wrap">{row.phone_number}</td>
                <td className="px-6 py-4 whitespace-wrap">{row.facility}</td>
                <td className="px-6 py-4 whitespace-wrap">{row.nin}</td>

                
                <td className="px-6 py-4 whitespace-wrap">
                  {row.date ? moment(row.date).format("YYYY-MM-DD") : "N/A"}
                </td>
                
                {user?.role === Roles.admin && (
                 <td className="px-6 py-4 whitespace-wrap flex justify-between items-center space-x-2">
                 <button
                   onClick={() => handleDeleteClick(row.id)}
                   className="bg-red-700 rounded-lg text-white px-2 py-1"
                 >
                   Delete
                 </button>
                 
                 <button
                     onClick={() => handleUpdateClick(row.id)}
                   className="bg-green-600 rounded-lg text-white px-2 py-1"
                 >
                   Update
                 </button>
               </td>
          )}


{/* Confirmation Modal */}
{isModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <p className="text-lg mb-4">Are you sure you want to delete this item?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800"
              >
                Yes
              </button>
              <button
                onClick={handleCancelDelete}
                className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      
{/* Confirmation Modal for Update */}
{isUpdateModalVisible && (
                  <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
                      <h2 className="text-lg font-semibold mb-4">Update Record</h2>
                      <div className="space-y-4">
                        <input
                          type="text"
                          className="border p-2 w-full"
                          placeholder="Name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                        />
                        <input
                          type="text"
                          className="border p-2 w-full"
                          placeholder="lga"
                          value={formData.lga}
                          onChange={(e) =>
                            setFormData({ ...formData, lga: e.target.value })
                          }
                        />
                        <input
                          type="text"
                          className="border p-2 w-full"
                          placeholder="ward"
                          value={formData.ward}
                          onChange={(e) =>
                            setFormData({ ...formData, ward: e.target.value })
                          }
                        />
                        <input
                          type="text"
                          className="border p-2 w-full"
                          placeholder="gender"
                          value={formData.gender}
                          onChange={(e) =>
                            setFormData({ ...formData, gender: e.target.value })
                          }
                        />

                        <input
                          type="text"
                          className="border p-2 w-full"
                          placeholder="Marrital status"
                          value={formData.marital_status}
                          onChange={(e) =>
                            setFormData({ ...formData, marital_status: e.target.value })
                          }
                        />
                         <input
                          type="text"
                          className="border p-2 w-full"
                          placeholder="Settlement"
                          value={formData.settlement}
                          onChange={(e) =>
                            setFormData({ ...formData, settlement: e.target.value })
                          }
                        />
                        <input
                          type="text"
                          className="border p-2 w-full"
                          placeholder="facility"
                          value={formData.facility}
                          onChange={(e) =>
                            setFormData({ ...formData, facility: e.target.value })
                          }
                        />
                        <input
                          type="text"
                          className="border p-2 w-full"
                          placeholder="phone Number"
                          value={formData.phone_number}
                          onChange={(e) =>
                            setFormData({ ...formData, phone_number: e.target.value })
                          }
                        />
                        <input
                          type="text"
                          className="border p-2 w-full"
                          placeholder="nin"
                          value={formData.nin}
                          onChange={(e) =>
                            setFormData({ ...formData, nin: e.target.value })
                          }
                        />

                      </div>
                      <div className="flex justify-end mt-4 space-x-2">
                        <button
                          onClick={handleConfirmUpdate}
                          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                        >
                          Save changes
                        </button>
                        <button
                          onClick={handleCancelUpdate}
                          className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
    
              </tr>
            ))}
        </tbody>
        {/* Pagination controls */}
        <div className="flex justify-center">
          <div className="pagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border bg-green-700 text-white mt-4 mr-4 ml-4 rounded-lg "
            >
              Previous
            </button>
            <span>{currentPage}</span>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
              className="px-4 py-2 bg-white ml-4 rounded-lg"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </table>
  );
};

export default JichmaTable;
