"use client";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useRehabStore } from "@/store/useRehab";
import { CSVLink } from "react-csv";
import { BsArrowDownUp } from "react-icons/bs";
import moment from "moment";
import { GeepsList } from "@/types/geeps-types";
import { useGeepsStore } from "@/store/useGeeps";
import { useUserStore } from '@/store/userStore';
import { Roles } from '@/helpers/Roles';
import { FaPlus } from "react-icons/fa6";

interface GeepsListProps {
  data: GeepsList[];
  itemsPerPage: number;
}

const GeepsListTable: React.FC<GeepsListProps> = ({data}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [nameSearchTerm, setNameSearchTerm] = useState<string>("");
  const [roleSearchTerm, setRoleSearchTerm] = useState<string>("");
  const { deleteGeepsById } = useGeepsStore();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);
  const [itemIdToUpdate, setItemIdToUpdate] = useState(null);
  const { geepss } = useGeepsStore();
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    middle_name: '',
    title: '',
    scheme: '',
    zone: '',
    state: '',
    lga: '',
    ward: '',
    gender: '',
    dob: '',
    marital_status: '',
    parental_status: '',
    home_address: '',
    phone_number: '',
    nin: '',
    bvn: '',
    business_address: '',
    next_of_kin: '',
    guarantor: '',
    bank: '',
    bank_account: '',
    access_bank: '',
    loan_disbured: '',
    loan_outstanding: '',
    delinquency_status: '',
    loan_maturity_date: '',
    agric_venture: '',
    farming_season: '',
    type_of_commodity: '',
    type_of_machinery: '',
    amount_invest: '',
    amount_needed: '',
    additional_support: '',
    location: '',
    trade: '',
    updater: '',
    disbursed: true,
    repaid: true,
    confirm:true,
});

  const { user } = useUserStore();
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
        await useGeepsStore.getState().deleteGeepsById(itemIdToDelete);
  
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
  const selectedItem =  geepss.find((item:  GeepsList) => item.id === id);
  if (selectedItem) {
    
    setFormData({
    first_name: selectedItem.first_name,
    last_name: selectedItem.last_name,
    middle_name: selectedItem.middle_name,
    title: selectedItem.title,
    scheme: selectedItem.scheme,
    zone: selectedItem.zone,
    state: selectedItem.state,
    lga: selectedItem.lga,
    ward: selectedItem.ward,
    gender: selectedItem.gender,
    dob: selectedItem.dob,
    marital_status: selectedItem.marital_status,
    parental_status: selectedItem.parental_status,
    home_address: selectedItem.home_address,
    phone_number: selectedItem.phone_number,
    nin: selectedItem.nin,
    bvn: selectedItem.bvn,
    business_address: selectedItem.business_address,
    next_of_kin: selectedItem.next_of_kin,
    guarantor: selectedItem.guarantor,
    bank: selectedItem.bank,
    bank_account: selectedItem.bank_account,
    access_bank: selectedItem.access_bank,
    loan_disbured: selectedItem.loan_disbured.toString(),
    loan_outstanding: selectedItem.loan_outstanding.toString(),
    delinquency_status: selectedItem.delinquency_status,
    loan_maturity_date: selectedItem.loan_maturity_date,
    agric_venture: selectedItem.agric_venture,
    farming_season: selectedItem.farming_season,
    type_of_commodity: selectedItem.type_of_commodity,
    type_of_machinery: selectedItem.type_of_machinery,
    amount_invest: selectedItem.amount_invest.toString(),
    amount_needed: selectedItem.amount_needed.toString(),
    additional_support: selectedItem.additional_support,
    location: '',
    trade: '',
    updater: '',
    disbursed: true,
    repaid: true,
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
        loan_disbured:Number(formData.loan_disbured),
        loan_outstanding:Number(formData.loan_outstanding),
        amount_invest:Number(formData.amount_invest),
        amount_needed:Number(formData.amount_needed)
      };
      // Get the updateAgricById function from the store
      const { updateGeepsById } = useGeepsStore.getState();
      // Perform the update operation with the updated form data
      await updateGeepsById(itemIdToUpdate, updatedFormData);
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

  function hasId(row: GeepsList): row is GeepsList & { id: number } {
    return row.id !== undefined;
  }
// Filter data based on name search term
const filteredData = nameSearchTerm
? data.filter((row) =>
  row.gender.toLowerCase().includes(nameSearchTerm.toLowerCase()) ||
row.bvn.toLowerCase().includes(nameSearchTerm.toLowerCase()) ||
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
        first_name: row.first_name,
        last_name: row.last_name,
        ward: row.ward,
        gender: row.gender,
        title: row.title,
        schem: row.scheme,
        zone_: row.zone,
        marital_status: row.marital_status,
        parental_status: row.parental_status,
        nin: row.nin,
        bvn: row.bvn,
        guarantor: row.guarantor,
        bank: row.bank,
        bank_account: row.bank_account,
        amount_invest: row.amount_invest,
        amount_needed: row.amount_needed,
        repaid: row.repaid,
        additional_support: row.additional_support,
        load_outsatnding: row.loan_outstanding,
        load:row.loan_disbured,
      }));
    } else {
      return filteredData
        .filter((row) => hasId(row) && selectedItems.includes(row.id))
        .map((row) => ({
        first_name: row.first_name,
        last_name: row.last_name,
        ward: row.ward,
        gender: row.gender,
        title: row.title,
        schem: row.scheme,
        zone_: row.zone,
        marital_status: row.marital_status,
        parental_status: row.parental_status,
        nin: row.nin,
        bvn: row.bvn,
        guarantor: row.guarantor,
        bank: row.bank,
        bank_account: row.bank_account,
        amount_invest: row.amount_invest,
        amount_needed: row.amount_needed,
        repaid: row.repaid,
        additional_support: row.additional_support,
        load_outsatnding: row.loan_outstanding,
        load:row.loan_disbured
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
            filename="Geeps.csv"
            className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-[#5BCAA2] focus:outline-none focus:shadow-outline-blue"
          >
            Download
          </CSVLink>
        </div>
        <div className="relative flex items-center">
          <a href="/others/sip/Beneficiary/AddNew/Geeps" className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-[#5BCAA2] focus:outline-none focus:shadow-outline-blue flex items-center space-x-2">
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
              First Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider">
              Last name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
             Ward
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
             GENDER
            </th>

            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
             Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
             Scheme
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
            Zone
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
             marital status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
             NIN
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
             BVN
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
             Guarantor
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Bank
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
             Account
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
             amount invest
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
             Amount Needed
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
             Repaid
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
             additional support
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
             Loan outstanding
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
             Loan disbursed
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
                <td className="px-6 py-4 whitespace-wrap">{row.first_name}</td>
                <td className="px-6 py-4 whitespace-wrap">{row.last_name}</td>
                <td className="px-6 py-4 whitespace-wrap">{row.ward}</td>
                <td className="px-6 py-4 whitespace-wrap">{row.gender}</td>
                <td className="px-6 py-4 whitespace-wrap">{row.title}</td>
                <td className="px-6 py-4 whitespace-wrap">{row.scheme}</td>
                <td className="px-6 py-4 whitespace-wrap">{row.zone}</td>
                <td className="px-6 py-4 whitespace-wrap">{row.marital_status}</td>
                <td className="px-6 py-4 whitespace-wrap">{row.nin}</td>
                <td className="px-6 py-4 whitespace-wrap">{row.bvn}</td>
                <td className="px-6 py-4 whitespace-wrap">{row.guarantor}</td>
                <td className="px-6 py-4 whitespace-wrap">{row.bank}</td>
                <td className="px-6 py-4 whitespace-wrap">{row.bank_account}</td>
                <td className="px-6 py-4 whitespace-wrap">{row.amount_invest}</td>
                <td className="px-6 py-4 whitespace-wrap">{row.amount_needed}</td>
                <td className="px-6 py-4 whitespace-wrap">{row.repaid || "No data"}</td>
                <td className="px-6 py-4 whitespace-wrap">{row.additional_support}</td>
                <td className="px-6 py-4 whitespace-wrap">{row.loan_outstanding}</td>
                <td className="px-6 py-4 whitespace-wrap">{row.loan_disbured || "No data"}</td>
                {/*
                <td className="px-6 py-4 whitespace-wrap">
                  {row.date ? moment(row.date).format("YYYY-MM-DD") : "N/A"}
                </td>
                */}
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
                          placeholder="first name"
                          value={formData.first_name}
                          onChange={(e) =>
                            setFormData({ ...formData, first_name: e.target.value })
                          }
                        />
                        <input
                          type="text"
                          className="border p-2 w-full"
                          placeholder="last name"
                          value={formData.last_name}
                          onChange={(e) =>
                            setFormData({ ...formData, last_name: e.target.value })
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
                          placeholder="title"
                          value={formData.title}
                          onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                          }
                        />
                        <input
                          type="text"
                          className="border p-2 w-full"
                          placeholder="scheme"
                          value={formData.scheme}
                          onChange={(e) =>
                            setFormData({ ...formData, scheme: e.target.value })
                          }
                        />
                        <input
                          type="text"
                          className="border p-2 w-full"
                          placeholder="zone"
                          value={formData.zone}
                          onChange={(e) =>
                            setFormData({ ...formData, zone: e.target.value })
                          }
                        />
                        <input
                          type="text"
                          className="border p-2 w-full"
                          placeholder="amount invest"
                          value={formData.amount_invest}
                          onChange={(e) =>
                            setFormData({ ...formData, amount_invest: e.target.value })
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
                         <input
                          type="text"
                          className="border p-2 w-full"
                          placeholder="amount needed"
                          value={formData.amount_needed}
                          onChange={(e) =>
                            setFormData({ ...formData, amount_needed: e.target.value })
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

export default GeepsListTable;
