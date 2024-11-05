package TES.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StaffService {

    @Autowired
    private StaffRepository staffRepository;

    public Staff saveStaff(Staff staff) {
        return staffRepository.save(staff);
    }

    public Optional<Staff> updateStaff(Long id, Staff staff) {
        if (staffRepository.existsById(id)) {
            staff.setStaffId(id);
            return Optional.of(staffRepository.save(staff));
        }
        return Optional.empty();
    }

    public String deleteStaff(Long id) {
        if (staffRepository.existsById(id)) {
            staffRepository.deleteById(id);
            return "Staff record successfully deleted";
        }
        return "Staff record not found";
    }

    public List<Staff> getAllStaffs() {
        return staffRepository.findAll();
    }
}